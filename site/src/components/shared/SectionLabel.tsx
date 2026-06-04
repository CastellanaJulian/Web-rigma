type SectionLabelProps = {
  children: React.ReactNode
  dark?: boolean
}

export default function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <div
      className="flex items-center gap-3"
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(30,30,30,0.65)',
        marginBottom: 36,
      }}
    >
      <span className="w-5 h-px bg-accent flex-shrink-0" />
      {children}
    </div>
  )
}
