import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'KidsPlayGuide - Safe & Fun Online Games for Kids';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #fef3c7 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            fontSize: 80,
            opacity: 0.3,
          }}
        >
          🎮
        </div>
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 100,
            fontSize: 60,
            opacity: 0.3,
          }}
        >
          🧩
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: 120,
            fontSize: 50,
            opacity: 0.3,
          }}
        >
          📚
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            fontSize: 70,
            opacity: 0.3,
          }}
        >
          🎨
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 50,
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
            }}
          >
            🎮
          </div>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 800 }}>
            <span style={{ color: '#1e293b' }}>Kids</span>
            <span style={{ color: '#6366f1' }}>Play</span>
            <span style={{ color: '#f97316' }}>Guide</span>
          </div>
        </div>

        <div
          style={{
            fontSize: 36,
            color: '#475569',
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          Safe & Fun Online Games for Kids
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255,255,255,0.8)',
              padding: '16px 28px',
              borderRadius: 16,
              fontSize: 24,
              color: '#059669',
              fontWeight: 600,
            }}
          >
            <span>✓</span>
            <span>100+ Games</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255,255,255,0.8)',
              padding: '16px 28px',
              borderRadius: 16,
              fontSize: 24,
              color: '#6366f1',
              fontWeight: 600,
            }}
          >
            <span>🔒</span>
            <span>Ad-Free</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255,255,255,0.8)',
              padding: '16px 28px',
              borderRadius: 16,
              fontSize: 24,
              color: '#f97316',
              fontWeight: 600,
            }}
          >
            <span>👨‍👩‍👧</span>
            <span>Ages 0-10</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
