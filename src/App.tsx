import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AppContainer } from './components/AppContainer'
import { Header } from './components/Header'
import { ApiProvider } from './providers/ApiProvider'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const AboutPage = lazy(() => 
  delay(3000).then(() => import('./pages/AboutPage'))
);
const SettingsPage = lazy(() => 
  delay(3000).then(() => import('./pages/SettingsPage'))
);


const LoadingFallback = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: '24px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #9333ea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Загрузка страницы...</p>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

function AppContent() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

function App() {
  return (
    <ApiProvider>
      <AppContainer>
        <AppContent />
      </AppContainer>
    </ApiProvider>
  )
}

export default App

