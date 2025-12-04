import { Suspense } from 'react';
import { useCatFact } from '../hooks/useCatFact';

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

function CatFactContent() {
  const { data: catFact } = useCatFact();

  return (
    <div style={{ padding: '24px' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
        {catFact.fact}
      </p>
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
        Длина: {catFact.length} символов
      </div>
    </div>
  );
}

export const SlideoverContent = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CatFactContent />
    </Suspense>
  );
};
