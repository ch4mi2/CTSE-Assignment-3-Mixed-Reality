import './App.css';
import ARScene from './components/ARScene';

function App() {
  return (
    <>
      {/* AR Scene Component */}
      <ARScene />

      {/* React info overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: 10,
          pointerEvents: 'none',
        }}
      >
        <h2 style={{ color: 'white' }}>React is running ✅</h2>
      </div>
    </>
  );
}

export default App;
