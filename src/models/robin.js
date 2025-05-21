export const robinHTML = `
<a-marker type='pattern' url='/markers/robin.patt' id="hiro-marker">
    <a-entity
      gltf-model="url(/models/robin_bird.glb)"
      animation-mixer="clip: Robin_Bird_Fly; loop: repeat"
      scale="20 20 20"
      position="0 0 0"
      rotation="-30 90 90"
    ></a-entity>
    <a-sound
      id="birdSound"
      src="url(/sounds/robin-singing.mp3)"
      autoplay="false"
      position="0 2 0"
    ></a-sound>
    </a-marker>

`;

export function initRobinEvents() {
  const hiroMarker = document.querySelector('#hiro-marker');
  const birdEntity = hiroMarker.querySelector('a-entity');
  const birdSound = document.querySelector('#birdSound');

  // Play sound on marker detection
  if (hiroMarker && birdSound) {
    hiroMarker.addEventListener('markerFound', () => {
      birdSound.components?.sound?.playSound();
    });

    hiroMarker.addEventListener('markerLost', () => {
      birdSound.components?.sound?.stopSound();
    });
  }

  // Mouse-based rotation
  let isDragging = false;
  let prevX = 0;

  document.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevX = e.clientX;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevX;
    prevX = e.clientX;

    // Adjust rotation (Y-axis)
    birdEntity.object3D.rotation.x -= deltaX * 0.01;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

