import { useEffect, useRef, useState } from 'react';
import { forestHTML, initForestEvents } from '../models/forest.js';
import { initRobinEvents, robinHTML } from '../models/robin.js';
import './ARScene.css';

const ARScene = () => {
  const sceneContainerRef = useRef(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create scene HTML
    const sceneHTML = `
      <a-scene embedded arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; debugUIEnabled: false;">
        ${robinHTML}
        ${forestHTML}
        <a-entity camera></a-entity>
      </a-scene>
    `;

    // Insert scene into container
    if (sceneContainerRef.current) {
      sceneContainerRef.current.innerHTML = sceneHTML;

      // Get scene element
      const scene = sceneContainerRef.current.querySelector('a-scene');

      // Listen for scene loaded event
      scene.addEventListener('loaded', () => {
        console.log('AR scene loaded');
        setIsLoading(false);

        // Initialize event handlers for both scenes
        initRobinEvents();
        initForestEvents();

        // Handle iOS device orientation permissions
        handleIOSPermissions();
      });
    }

    // Cleanup function
    return () => {
      // Remove any event listeners or cleanup tasks
      if (sceneContainerRef.current) {
        const scene = sceneContainerRef.current.querySelector('a-scene');
        if (scene) {
          // Clean up any A-Frame specific listeners if needed
        }
      }
    };
  }, []);

  // Handle iOS device orientation permissions
  const handleIOSPermissions = () => {
    if (
      DeviceOrientationEvent &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      const requestOrientationPermission = async () => {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response !== 'granted') {
            console.warn('Device orientation permission not granted');
          }
        } catch (error) {
          console.error('Error requesting orientation permission:', error);
        }
      };

      // Create permission button (using DOM API since we need to stay compatible with A-Frame)
      const permissionButton = document.createElement('button');
      permissionButton.textContent = 'Enable AR';
      permissionButton.className = 'permission-button';
      permissionButton.addEventListener('click', () => {
        requestOrientationPermission().then(() => {
          permissionButton.remove();
        });
      });

      document.body.appendChild(permissionButton);
    }
  };

  return (
    <>
      {/* AR Scene container */}
      <div
        ref={sceneContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="loading-content">
            <h2>Loading AR Experience</h2>
            <p>Please wait...</p>
          </div>
        </div>
      )}

      {/* AR UI Overlay */}
      <div className="ar-ui-overlay">
        {showInstructions && (
          <div className="instructions">
            <h2>AR Nature Experience</h2>
            <p>Find these markers to reveal AR content:</p>
            <div className="markers">
              <div className="marker-item">
                <img src="/images/hiro-marker.png" alt="Hiro Marker" />
                <p>Robin Bird</p>
              </div>
              <div className="marker-item">
                <img src="/images/kanji-marker.png" alt="Kanji Marker" />
                <p>Forest Scene</p>
              </div>
            </div>
            <p>Tap on 3D models to interact with them!</p>
          </div>
        )}
        <button
          className="toggle-button"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
        </button>
      </div>
    </>
  );
};

export default ARScene;
