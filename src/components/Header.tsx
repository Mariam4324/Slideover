import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { href: '/about', label: 'О проекте', id: 'about' },
  { href: '/settings', label: 'Настройки', id: 'settings' },
];

export function Header() {
  const location = useLocation();

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          {/* project name */}
          <Link
            to="/"
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#111827',
              textDecoration: 'none',
            }}
          >
            Slideover test app
          </Link>

          {/* navigation */}
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '8px',
              margin: 0,
              padding: 0,
            }}
          >
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      color: isActive ? '#2563eb' : '#4b5563',
                      backgroundColor: isActive ? '#eff6ff' : 'transparent',
                      fontWeight: isActive ? '600' : '400',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

