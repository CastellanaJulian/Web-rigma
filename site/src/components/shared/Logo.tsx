type LogoProps = {
  size?: number
  color?: string
}

export default function Logo({ size = 40, color = '#1E1E1E' }: LogoProps) {
  const border = Math.round(size * 0.055)
  const fontSize = Math.round(size * 0.4)
  const padding = Math.round(size * 0.12)

  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        border: `${border}px solid ${color}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: `0 ${padding}px`,
        lineHeight: 1.05,
      }}
    >
      <div style={{ fontSize, fontWeight: 500, letterSpacing: '-0.01em', color }}>RIG</div>
      <div style={{ fontSize, fontWeight: 500, letterSpacing: '-0.01em', color }}>MA</div>
    </div>
  )
}
