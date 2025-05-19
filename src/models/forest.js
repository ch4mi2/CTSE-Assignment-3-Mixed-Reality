export const forestHTML = `
  <a-marker type="pattern" url="/markers/forest-marker.patt" id="forest-marker">
    <!-- Forest environment -->
    <a-entity
      position="0 0 0"
      scale="5 5 5">
       
      <!-- Trees -->
      <a-entity
        gltf-model="url(/models/tree_reformed.glb)"
        position="0 0 0"
        rotation="0 0 0"
        scale="0.2 0.2 0.2"></a-entity>
     
      <!-- Deer model with correct animation -->
      <a-entity
        id="deer"
        gltf-model="url(/models/deer.glb)"
        position="0 0.04 0"
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
   
    <a-entity id="infoTextContainer" position="0 2.5 0" visible="false">
      <a-plane 
        color="#2A3B4C" 
        opacity="0.8" 
        width="4" 
        height="1.5" 
        position="0 0 -0.01"
        material="shader: flat; transparent: true; side: double"
        animation__position=""
        animation__rotation=""
        animation__scale="">
      </a-plane>
      
      <a-plane 
        color="#F5A623" 
        opacity="0.9" 
        width="4.1" 
        height="1.6" 
        position="0 0 -0.02"
        material="shader: flat; transparent: true"
        animation__position=""
        animation__rotation=""
        animation__scale="">
      </a-plane>
      
      <a-text
        value="DEER FACT"
        position="0 0 1"
        align="center"
        width="4"
        color="#F5A623"
        font="kelsonsans"
        anchor="center"
        baseline="center"
        animation__position=""
        animation__rotation=""
        animation__scale="">
      </a-text>
      
      <a-text
        id="infoText"
        value="Deer can rotate each ear independently, allowing them to listen in multiple directions simultaneously to detect predators and stay alert in their environment."
        position="0 0 0.5"
        align="center"
        width="3.5"
        color="#FFFFFF"
        font="kelsonsans"
        baseline="center"
        animation__position=""
        animation__rotation=""
        animation__scale="">
      </a-text>
    </a-entity>
  </a-marker>
`;

export function initForestEvents() {
  setTimeout(() => {
    const forestMarker = document.querySelector('#forest-marker');
    const forestSound = document.querySelector('#forestSound');
    const deer = document.querySelector('#deer');
    const deerSound = document.querySelector('#deerSound');
    const infoTextContainer = document.querySelector('#infoTextContainer');

    if (forestMarker && forestSound) {
      forestMarker.addEventListener('markerFound', () => {
        console.log('Forest marker found');
        forestSound.components?.sound?.playSound();

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
        if (infoTextContainer) {
          infoTextContainer.setAttribute('visible', false);
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
        if (infoTextContainer) {
          infoTextContainer.setAttribute('visible', true);
        }

        const currentState =
          deer.getAttribute('animation-mixer').enabled !== false;
        deer.setAttribute('animation-mixer', {
          clip: 'AnimalArmature|AnimalArmature|Eating',
          loop: 'repeat',
          enabled: !currentState,
        });
        console.log(`Animation ${!currentState ? 'resumed' : 'paused'}`);
      });

      deer.addEventListener('mouseleave', () => {
        console.log('Mouse left deer');
        if (infoTextContainer) {
          infoTextContainer.setAttribute('visible', false);
        }
        if (deerSound && deerSound.components?.sound) {
          deerSound.components.sound.stopSound();
        }
      });
    }

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

    document.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);

      if (element && element.id !== 'deer' && infoTextContainer) {
        infoTextContainer.setAttribute('visible', false);
      }
    });
  }, 1000);
}
