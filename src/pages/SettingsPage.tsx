import { Slideover } from '../components/Slideover';
import { useState, Suspense } from 'react';
import { SlideoverContent } from '../components/SlideoverContent';

const LoadingSpinner = () => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
    <div
      style={{
        width: '32px',
        height: '32px',
        border: '3px solid #e5e7eb',
        borderTop: '3px solid #9333ea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto',
      }}
    />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

function SettingsPageContent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <h1>Settings Page</h1>
      <button onClick={() => setIsOpen(true)}>open slideover</button>

      {isOpen && (
        <Slideover
          title="Cat Fact"
          onClose={() => setIsOpen(false)}
          content={
            <Suspense fallback={<LoadingSpinner />}>
              <SlideoverContent />
            </Suspense>
          }
        />
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '24px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #9333ea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }}
          />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      }
    >
      <SettingsPageContent />
    </Suspense>
  );
}