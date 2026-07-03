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
    borderBottom: '1px solid rgba(28,28,30,0.09)',
    gap: '16px',
  } as React.CSSProperties,

  tab: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6E6E6A',
    padding: '10px 0px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    marginBottom: '-1px',
    transition: 'color .12s',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  tabActive: {
    color: '#1E1E1D',
    fontWeight: 600,
    borderBottomColor: '#1E1E1D',
  } as React.CSSProperties,

  tabHover: {
    color: '#1E1E1D',
  } as React.CSSProperties,
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  const [hovered, setHovered] = React.useState<string | null>(null)

  return (
    <div style={styles.tabs}>
      {tabs.map((tab) => {
        const isActive = tab.id === active
        const isHovered = hovered === tab.id && !isActive

        return (
          <div
            key={tab.id}
            style={{
              ...styles.tab,
              ...(isActive ? styles.tabActive : {}),
              ...(isHovered ? styles.tabHover : {}),
            }}
            onClick={() => onChange(tab.id)}
            onMouseEnter={() => setHovered(tab.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {tab.label}
          </div>
        )
      })}
    </div>
  )
}
