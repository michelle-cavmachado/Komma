import React from 'react'

type TabItem = {
  id: string
  label: string
}

type TabsProps = {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
}

const styles = {
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--komma-border)',
    gap: '16px',
  } as React.CSSProperties,

  tab: {
    fontFamily: 'var(--komma-font-sans)',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--komma-text-secondary)',
    padding: '10px 0px',
    background: 'transparent',
    border: '0',
    borderBottom: '2px solid transparent',
    marginBottom: '-1px',
    cursor: 'pointer',
    transition: 'color .12s',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  tabActive: {
    color: 'var(--komma-text-primary)',
    fontWeight: 600,
    borderBottomColor: 'var(--komma-text-primary)',
  } as React.CSSProperties,

  tabHover: {
    color: 'var(--komma-text-primary)',
  } as React.CSSProperties,

  tabFocus: {
    outline: '2px solid var(--komma-action-primary)',
    outlineOffset: '2px',
  } as React.CSSProperties,
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [focused, setFocused] = React.useState<string | null>(null)
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({})

  const focusTabAt = (index: number) => {
    const tab = tabs[(index + tabs.length) % tabs.length]
    tabRefs.current[tab.id]?.focus()
    onChange(tab.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusTabAt(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusTabAt(index - 1)
    }
  }

  return (
    <div style={styles.tabs} role="tablist">
      {tabs.map((tab, index) => {
        const isActive = tab.id === active
        const isHovered = hovered === tab.id && !isActive
        const isFocused = focused === tab.id

        return (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            style={{
              ...styles.tab,
              ...(isActive ? styles.tabActive : {}),
              ...(isHovered ? styles.tabHover : {}),
              ...(isFocused ? styles.tabFocus : {}),
            }}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onMouseEnter={() => setHovered(tab.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setFocused(tab.id)}
            onBlur={() => setFocused(null)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
