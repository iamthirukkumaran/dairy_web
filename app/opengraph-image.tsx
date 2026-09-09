import { ImageResponse } from 'next/og';

/** Rendered once at build time so `output: 'export'` can emit it as a file. */
export const dynamic = 'force-static';

export const alt = 'Aura — Your life, beautifully remembered.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated at build time so the card always matches the current copy. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(160deg, #FBF6EC 0%, #F6EADA 55%, #E7EFE3 100%)',
          color: '#2A2521',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 10 }}>AURA</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 86, lineHeight: 1.02, letterSpacing: -2 }}>
            Your life,
          </div>
          <div style={{ fontSize: 86, lineHeight: 1.02, letterSpacing: -2 }}>
            beautifully remembered.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: '#6B6157', maxWidth: 880 }}>
            Talk about your day. Aura writes your diary, remembers what mattered, and turns your year
            into a book.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
