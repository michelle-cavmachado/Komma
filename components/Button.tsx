import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost'
type ButtonSize = 'default' | 'small'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: "'Inter Tight', system-ui, sans-serif",
  fontWeight: 600,
  borderRadius: '8px',
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
    base: { background: '#29283E', color: '#fff' },
    hover: { background: '#1F1E30' },
  },
  secondary: {
    base: { background: '#FAFAFA', borderColor: 'rgba(28,28,30,0.14)', color: '#1E1E1D' },
    hover: { background: '#F1F1EF' },
  },
  destructive: {
    base: { background: '#FAFAFA', borderColor: 'rgba(28,28,30,0.14)', color: '#C11806' },
    hover: {},
  },
  ghost: {
    base: { background: 'transparent', color: '#6E6E6A', borderColor: 'transparent' },
    hover: { background: '#F1F1EF', color: '#1E1E1D' },
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
