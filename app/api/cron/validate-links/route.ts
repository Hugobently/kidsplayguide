import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  // Verify cron secret
  const cronSecret = request.headers.get('x-cron-secret');
  if (cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const games = await db.game.findMany({
      where: { isActive: true },
      select: { id: true, gameUrl: true, consecutiveLinkFailures: true },
    });

    let checked = 0;
    let broken = 0;

    for (const game of games) {
      const ok = await checkUrl(game.gameUrl);

      if (!ok) {
        const failures = game.consecutiveLinkFailures + 1;
        await db.game.update({
          where: { id: game.id },
          data: {
            linkStatus: 'broken',
            consecutiveLinkFailures: failures,
            lastLinkCheck: new Date(),
            // Deactivate after 3 consecutive failures
            isActive: failures >= 3 ? false : undefined,
          },
        });
        broken++;
      } else {
        await db.game.update({
          where: { id: game.id },
          data: {
            linkStatus: 'ok',
            consecutiveLinkFailures: 0,
            lastLinkCheck: new Date(),
          },
        });
      }
      checked++;
    }

    // Log the run
    await db.curationLog.create({
      data: {
        action: 'link_check',
        source: 'cron',
        details: JSON.stringify({ checked, broken }),
        success: true,
      },
    });

    return NextResponse.json({ checked, broken });
  } catch (error) {
    console.error('Link validation failed:', error);

    // Log the failure
    await db.curationLog.create({
      data: {
        action: 'link_check',
        source: 'cron',
        details: JSON.stringify({ error: String(error) }),
        success: false,
      },
    });

    return NextResponse.json(
      { error: 'Link validation failed' },
      { status: 500 }
    );
  }
}

async function checkUrl(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}
