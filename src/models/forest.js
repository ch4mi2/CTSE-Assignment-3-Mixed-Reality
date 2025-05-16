// Fixed forest.js with correct animation name
export const forestHTML = `
  <a-marker preset="kanji" id="forest-marker">
    <!-- Forest environment -->
    <a-entity
      position="0 0 0"
      scale="5 5 5">
       
      <!-- Trees -->
      <a-entity
        gltf-model="url(/models/tree_reformed.glb)"
        position="0 0.1 0"
        rotation="0 0 0"
        scale="0.2 0.2 0.2"></a-entity>
       
     
      <!-- Deer model with correct animation -->
      <a-entity
        id="deer"
        gltf-model="url(/models/deer.glb)"
        position="0 0.1 0"
        scale="0.3 0.3 0.3"
        rotation="0 0 0"
        animation-mixer="clip: AnimalArmature|AnimalArmature|Eating; loop: repeat"
        class="interactive"></a-entity>
       
      <!-- Ambient forest sounds -->
      <a-sound
        id="forestSound"
        src="url(/sounds/forest-ambient.mp3)"
        autoplay="false"
        loop="true"
        position="0 1 0"></a-sound>
       
      <!-- Deer sound -->
      <a-sound
        id="deerSound"
        src="url(/sounds/deer-sound.mp3)"
        autoplay="false"
        position="0 0.5 0"></a-sound>
    </a-entity>
   
    <!-- Text popup that will be shown when deer is clicked -->
    <a-text
      id="infoText"
      value="Deer (Cervidae)"
      position="0 1 0"
      align="center"
      width="2"
      color="#FFF"
      visible="false"></a-text>
  </a-marker>
`;

export function initForestEvents() {
  // Wait for scene to initialize
  setTimeout(() => {
    const forestMarker = document.querySelector('#forest-marker');
    const forestSound = document.querySelector('#forestSound');
    const deer = document.querySelector('#deer');
    const deerSound = document.querySelector('#deerSound');
    const infoText = document.querySelector('#infoText');

    if (forestMarker && forestSound) {
      forestMarker.addEventListener('markerFound', () => {
        console.log('Forest marker found');
        forestSound.components?.sound?.playSound();

        // Start animation if not already playing
        if (deer) {
          deer.setAttribute('animation-mixer', {
            clip: 'AnimalArmature|AnimalArmature|Eating',
            loop: 'repeat',
          });
        }
      });

      forestMarker.addEventListener('markerLost', () => {
        console.log('Forest marker lost');
        forestSound.components?.sound?.stopSound();
        if (deerSound && deerSound.components?.sound) {
          deerSound.components.sound.stopSound();
        }
        if (infoText) {
          infoText.setAttribute('visible', false);
        }
      });
    }

    if (deer && deerSound) {
      deer.addEventListener('click', (event) => {
        console.log('Deer clicked');
        event.stopPropagation();
        if (deerSound && deerSound.components?.sound) {
          deerSound.components.sound.playSound();
        }
        if (infoText) {
          const isVisible = infoText.getAttribute('visible');
          infoText.setAttribute('visible', !isVisible);
        }

        // Toggle animation state (play/pause)
        const currentState =
          deer.getAttribute('animation-mixer').enabled !== false;
        deer.setAttribute('animation-mixer', {
          clip: 'AnimalArmature|AnimalArmature|Eating',
          loop: 'repeat',
          enabled: !currentState,
        });
        console.log(`Animation ${!currentState ? 'resumed' : 'paused'}`);
      });
    }

    // Add cursor for interaction
    const camera = document.querySelector('a-entity[camera]');
    if (camera && !document.querySelector('a-cursor')) {
      const cursor = document.createElement('a-cursor');
      cursor.setAttribute('raycaster', 'objects: .interactive');
      cursor.setAttribute('color', '#FFF');
      cursor.setAttribute('fuse', true);
      cursor.setAttribute('fuse-timeout', 1000);
      camera.appendChild(cursor);
    }

    // Touch event handling for mobile devices
    document.addEventListener('touchstart', (event) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        const mouseEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: touch.clientX,
          clientY: touch.clientY,
        });

        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element) {
          element.dispatchEvent(mouseEvent);
        }
      }
    });
  }, 1000);
}
