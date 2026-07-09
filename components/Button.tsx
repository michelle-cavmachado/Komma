import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost'
type ButtonSize = 'default' | 'small'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: 'var(--komma-font-sans)',
  fontWeight: 600,
  borderRadius: 'var(--komma-radius-md)',
  border: '1px solid transparent',
  cursor: 'pointer',
  letterSpacing: '-.01em',
  transition: 'background .12s, border-color .12s',
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  default: {
    height: '32px',
    padding: '0 12px',
    fontSize: '13px',
  },
  small: {
    height: '28px',
    padding: '0 10px',
    fontSize: '12px',
  },
}

const variantStyles: Record<ButtonVariant, { base: React.CSSProperties; hover: React.CSSProperties }> = {
  primary: {
    base: { background: 'var(--komma-action-primary)', color: '#fff' },
    hover: { background: 'var(--komma-action-primary-hover)' },
  },
  secondary: {
    base: { background: 'var(--komma-surface-card)', borderColor: 'var(--komma-border-strong)', color: 'var(--komma-text-primary)' },
    hover: { background: 'var(--komma-surface-muted)' },
  },
  tertiary: {
    base: {
      background: 'var(--komma-navy-glow)',
      color: 'var(--komma-text-primary)',
      borderColor: 'var(--komma-action-tertiary-border)',
      borderRadius: 'var(--komma-radius-xl)',
    },
    hover: { borderColor: 'var(--komma-border)' },
  },
  destructive: {
    base: { background: 'var(--komma-surface-card)', borderColor: 'var(--komma-border-strong)', color: 'var(--komma-status-critical)' },
    hover: {},
  },
  ghost: {
    base: { background: 'transparent', color: 'var(--komma-text-secondary)', borderColor: 'transparent' },
    hover: { background: 'var(--komma-surface-muted)', color: 'var(--komma-text-primary)' },
  },
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.4,
  cursor: 'not-allowed',
}

export function Button({
  variant = 'primary',
  size = 'default',
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
  ...rest
}: ButtonProps) {
  const [hovered, setHovered] = React.useState(false)
  const { base: variantBase, hover } = variantStyles[variant]

  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        ...base,
        ...sizeStyles[size],
        ...variantBase,
        ...(hovered && !disabled ? hover : {}),
        ...(disabled ? disabledStyle : {}),
        ...style,
      }}
      onMouseEnter={(e) => {
        setHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setHovered(false)
        onMouseLeave?.(e)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
