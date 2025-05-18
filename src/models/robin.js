export const robinHTML = `
    <a-entity
      gltf-model="url(/models/robin_bird.glb)"
      animation-mixer="clip: Robin_Bird_Fly; loop: repeat"
      scale="10 10 10"
      position="0 0 0"
      rotation="-30 90 90"
    ></a-entity>
    <a-sound
      id="birdSound"
      src="url(/sounds/robin-singing.mp3)"
      autoplay="false"
      position="0 2 0"
    ></a-sound>

`;

export function initRobinEvents() {
  const hiroMarker = document.querySelector('#hiro-marker');
  const birdSound = document.querySelector('#birdSound');

  if (hiroMarker && birdSound) {
    hiroMarker.addEventListener('markerFound', () => {
      birdSound.components?.sound?.playSound();
    });

    hiroMarker.addEventListener('markerLost', () => {
      birdSound.components?.sound?.stopSound();
    });
  }
}
