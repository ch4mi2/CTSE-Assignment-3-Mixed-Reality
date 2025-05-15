// robin.js

// Create the full AR scene as HTML
const sceneHTML = `
  <a-scene embedded arjs>
    <a-marker preset="hiro" id="hiro-marker">
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
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
`;

// Append scene to DOM
document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', sceneHTML);

  const marker = document.querySelector('#hiro-marker');
  const sound = document.querySelector('#birdSound');

  marker.addEventListener('markerFound', () => {
    if (sound?.components?.sound) {
      sound.components.sound.playSound();
    }
  });

  marker.addEventListener('markerLost', () => {
    if (sound?.components?.sound) {
      sound.components.sound.stopSound();
    }
  });
});
