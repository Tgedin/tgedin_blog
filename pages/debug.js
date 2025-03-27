import MainLayout from '../layouts/MainLayout';
import Image from 'next/image';

export default function Debug() {
  return (
    <MainLayout title="Debug Page">
      <h1>Debug Page</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Testing Image</h2>
        <p>The image below should appear if the path is correct:</p>
        <img 
          src="/meritocracy-banner.webp" 
          alt="Test image" 
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Testing Components</h2>
        <p>If you see this page without errors, your MainLayout component is working.</p>
      </div>
      
      <div>
        <h2>Next Steps</h2>
        <p>Check the console for any JavaScript errors.</p>
        <p>Verify that your posts.json file has the correct content.</p>
        <p>Make sure all component files mentioned above exist.</p>
      </div>
    </MainLayout>
  );
}
