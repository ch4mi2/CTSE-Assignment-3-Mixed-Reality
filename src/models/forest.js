export const forestHTML = `
  <a-marker preset="kanji" id="forest-marker">
    <!-- Forest environment -->
    <a-entity
      position="0 0 0"
      scale="5 5 5">
      
      <!-- Ground with grass -->
      <a-plane 
        position="0 -0.5 0" 
        rotation="-90 0 0" 
        width="5" 
        height="5" 
        color="#3a7e4f"
        roughness="1"></a-plane>
        
      <!-- Trees -->
      <a-entity
        gltf-model="url(/models/tree.glb)"
        position="-1 0 -1"
        scale="0.5 0.5 0.5"></a-entity>
        
      <a-entity
        gltf-model="url(/models/tree.glb)"
        position="1 0 -1.5"
        scale="0.4 0.4 0.4"></a-entity>
        
      <a-entity
        gltf-model="url(/models/tree.glb)"
        position="0.8 0 1"
        scale="0.6 0.6 0.6"></a-entity>
      
      <!-- Fox model with animation -->
      <a-entity
        id="fox"
        gltf-model="url(/models/fox.glb)"
        animation-mixer="clip: Fox_Run; loop: repeat"
        position="0 0 0"
        scale="0.2 0.2 0.2"
        rotation="0 0 0"
        class="interactive"></a-entity>
        
      <!-- Ambient forest sounds -->
      <a-sound
        id="forestSound"
        src="url(/sounds/forest-ambient.mp3)"
        autoplay="false"
        loop="true"
        position="0 2 0"></a-sound>
        
      <!-- Fox sound -->
      <a-sound
        id="foxSound"
        src="url(/sounds/fox-call.mp3)"
        autoplay="false"
        position="0 0.5 0"></a-sound>
    </a-entity>
    
    <!-- Text popup that will be shown when fox is clicked -->
    <a-text 
      id="infoText"
      value="Red Fox (Vulpes vulpes)"
      position="0 1.5 0"
      rotation="-90 0 0"
      align="center"
      width="4"
      color="#FFF"
      visible="false"></a-text>
  </a-marker>
`;

export function initForestEvents() {
  const forestMarker = document.querySelector('#forest-marker');
  const forestSound = document.querySelector('#forestSound');
  const fox = document.querySelector('#fox');
  const foxSound = document.querySelector('#foxSound');
  const infoText = document.querySelector('#infoText');

  if (forestMarker && forestSound) {
    forestMarker.addEventListener('markerFound', () => {
      console.log('Forest marker found');
      forestSound.components?.sound?.playSound();
    });

    forestMarker.addEventListener('markerLost', () => {
      console.log('Forest marker lost');
      forestSound.components?.sound?.stopSound();
      if (foxSound.components?.sound) {
        foxSound.components.sound.stopSound();
      }
      if (infoText) {
        infoText.setAttribute('visible', false);
      }
    });
  }

  if (fox) {
    fox.addEventListener('click', (event) => {
      console.log('Fox clicked');
      event.stopPropagation();

      if (foxSound && foxSound.components?.sound) {
        foxSound.components.sound.playSound();
      }

      if (infoText) {
        const isVisible = infoText.getAttribute('visible');
        infoText.setAttribute('visible', !isVisible);
      }

      const currentClip = fox.getAttribute('animation-mixer').clip;
      const newClip = currentClip === 'Fox_Run' ? 'Fox_Idle' : 'Fox_Run';
      fox.setAttribute('animation-mixer', `clip: ${newClip}; loop: repeat`);
    });
  }

  setupInteraction();
}

function setupInteraction() {
  const camera = document.querySelector('a-entity[camera]');
  if (camera && !document.querySelector('a-cursor')) {
    const cursor = document.createElement('a-cursor');
    cursor.setAttribute('raycaster', 'objects: .interactive');
    cursor.setAttribute('color', '#FFF');
    cursor.setAttribute('fuse', true);
    cursor.setAttribute('fuse-timeout', 1000);
    camera.appendChild(cursor);
  }

  document.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('click', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    document.dispatchEvent(mouseEvent);
  });
}
