type StatusPillProps = {
  status: 'En Ejecución' | 'Terminado'
  dark?: boolean
}

export default function StatusPill({ status, dark = false }: StatusPillProps) {
  const isActive = status === 'En Ejecución'

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm"
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '5px 12px',
        border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E9E9E9',
        background: dark ? 'rgba(255,255,255,0.10)' : 'transparent',
        color: dark ? '#FFFFFF' : '#1E1E1E',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: isActive
            ? '#B59969'
            : dark
              ? 'rgba(255,255,255,0.45)'
              : 'rgba(30,30,30,0.45)',
        }}
      />
      {status === 'En Ejecución' ? 'EN EJECUCIÓN' : 'TERMINADO'}
    </span>
  )
}
