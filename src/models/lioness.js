export const lionessHTML = `
<a-marker type="pattern" url="/markers/pattern-lion.patt" id="lion-patt">
  <a-entity scale="0.3 0.3 0.3">
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
          console.log('click');
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
