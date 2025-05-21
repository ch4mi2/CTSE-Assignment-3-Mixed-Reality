export const lionessHTML = `
<a-marker type="pattern" url="/markers/pattern-lion.patt" id="lion-patt">
  <a-entity>
    <!-- Lion -->
    <a-entity
      id="lion"
      class="clickable"
      gltf-model="url(/models/lioness.glb)"
      scale="0.7 0.7 0.7"
      position="0 0 0"
      rotation="0 0 0"
    ></a-entity>

    <!-- Background/forest -->
    <a-entity
      id="lion-bg"
      class="clickable"
      gltf-model="url(/models/lion-bg.glb)"
      scale="0.5 0.5 0.5"
    ></a-entity>

    <!-- Ambient forest sounds -->
    <a-sound
      id="lion-forestSound"
      src="url(/sounds/forest-ambient.mp3)"
      autoplay="false"
      loop="true"
      position="0 1 0"
    ></a-sound>
    <a-sound
      id="lion-roaring"
      src="url(/sounds/lion-roaring.mp3)"
      autoplay="false"
      loop="true"
      position="0 0 0"
    ></a-sound>
  </a-entity>

   <a-entity id="lion-infoTextContainer" position="0 2.5 0" visible="false">
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

export function initLionessEvents() {
  const lionMarker = document.querySelector('#lion-patt');
  const forestSound = document.querySelector('#lion-forestSound');
  const lion = document.querySelector('#lion');
  const scene = document.getElementById('scene');
  const infoTextContainer = document.getElementById('lion-infoTextContainer');
  const roaring = document.getElementById('lion-roaring');

  let isWalking = false;

  if (lionMarker && forestSound) {
    lionMarker.addEventListener('markerFound', () => {
      forestSound.components?.sound?.playSound();

      if (lion && scene) {
        scene.addEventListener('click', () => {
          if (isWalking) {
            lion.removeAttribute('animation-mixer');
            isWalking = false;
            roaring?.components?.sound?.stopSound();

            if (infoTextContainer) {
              infoTextContainer.setAttribute('visible', false);
            }
          } else {
            lion.setAttribute('animation-mixer', {
              clip: 'Object_0',
              loop: 'repeat',
            });
            isWalking = true;
            roaring?.components?.sound?.playSound();

            if (infoTextContainer) {
              infoTextContainer.setAttribute('visible', true);
            }
          }
        });
      }
    });

    lionMarker.addEventListener('markerLost', () => {
      forestSound?.components?.sound?.stopSound();
      roaring?.components?.sound?.stopSound();
      if (infoTextContainer) {
        infoTextContainer.setAttribute('visible', false);
      }
    });
  }
}
