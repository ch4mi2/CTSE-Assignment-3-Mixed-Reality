// import { forestHTML, initForestEvents } from './models/forest.js';
// import { initRobinEvents, robinHTML } from './models/robin.js';

// const sceneHTML = `
//   <a-scene embedded arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; debugUIEnabled: false;">
//     ${robinHTML}
//     ${forestHTML}
//     <a-entity camera></a-entity>

//     <!-- UI overlay with instructions -->
//     <div class="ar-ui-overlay">
//       <div class="instructions">
//         <h2>AR Nature Experience</h2>
//         <p>Find these markers to reveal AR content:</p>
//         <div class="markers">
//           <div class="marker-item">
//             <img src="/images/hiro-marker.png" alt="Hiro Marker (Robin)">
//             <p>Robin Bird</p>
//           </div>
//           <div class="marker-item">
//             <img src="/images/kanji-marker.png" alt="Kanji Marker (Forest)">
//             <p>Forest Scene</p>
//           </div>
//         </div>
//         <p>Tap on 3D models to interact with them!</p>
//       </div>
//     </div>
//   </a-scene>
// `;

// document.addEventListener('DOMContentLoaded', () => {
//   // Add AR scene to document
//   document.body.insertAdjacentHTML('afterbegin', sceneHTML);

//   // Initialize AR scene
//   const scene = document.querySelector('a-scene');
//   scene.addEventListener('loaded', () => {
//     console.log('AR scene loaded');

//     // Initialize event handlers for both scenes
//     initRobinEvents();
//     initForestEvents();

//     // Add UI toggle button for mobile
//     const uiOverlay = document.querySelector('.ar-ui-overlay');
//     const toggleButton = document.createElement('button');
//     toggleButton.textContent = 'Hide Instructions';
//     toggleButton.style.cssText =
//       'display: block; margin-top: 10px; padding: 5px;';

//     toggleButton.addEventListener('click', () => {
//       const instructions = document.querySelector('.instructions');
//       if (instructions.style.display === 'none') {
//         instructions.style.display = 'block';
//         toggleButton.textContent = 'Hide Instructions';
//       } else {
//         instructions.style.display = 'none';
//         toggleButton.textContent = 'Show Instructions';
//       }
//     });

//     uiOverlay.appendChild(toggleButton);

//     // Handle device orientation permission for iOS
//     if (
//       DeviceOrientationEvent &&
//       typeof DeviceOrientationEvent.requestPermission === 'function'
//     ) {
//       const permissionButton = document.createElement('button');
//       permissionButton.textContent = 'Enable AR';
//       permissionButton.style.cssText =
//         'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: #2196F3; color: white; border: none; border-radius: 5px; font-size: 16px; z-index: 9999;';

//       permissionButton.addEventListener('click', async () => {
//         try {
//           const response = await DeviceOrientationEvent.requestPermission();
//           if (response === 'granted') {
//             permissionButton.remove();
//           } else {
//             alert('Permission denied for device orientation');
//           }
//         } catch (error) {
//           console.error('Error requesting orientation permission:', error);
//         }
//       });

//       document.body.appendChild(permissionButton);
//     }
//   });

//   // Add loading indicator
//   const loadingIndicator = document.createElement('div');
//   loadingIndicator.style.cssText =
//     'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); color: white; display: flex; align-items: center; justify-content: center; z-index: 9999;';
//   loadingIndicator.innerHTML =
//     '<div style="text-align: center;"><h2>Loading AR Experience</h2><p>Please wait...</p></div>';
//   document.body.appendChild(loadingIndicator);

//   scene.addEventListener('loaded', () => {
//     // Remove loading indicator when scene is loaded
//     loadingIndicator.remove();
//   });
// });
