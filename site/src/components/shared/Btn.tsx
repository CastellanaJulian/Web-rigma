import Link from 'next/link'

type BtnProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

const styles = {
  base: 'inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200',
  size: 'px-8 py-3.5',
  text: 'text-xs font-semibold tracking-[0.12em] uppercase',
  primary: 'bg-white text-ink hover:bg-accent hover:text-white',
  secondary: 'bg-transparent border border-white/30 text-white hover:bg-white/10',
}

export default function Btn({ variant = 'primary', children, href, onClick, className = '' }: BtnProps) {
  const cls = `${styles.base} ${styles.size} ${styles.text} ${styles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
