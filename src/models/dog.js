export const dogHTML = `
  <a-entity
    id="dog"
    class="clickable"
    gltf-model="url(/models/dog.glb)"
    animation-mixer="clip: Rest Pose; loop: repeat"
    scale="2 2 2"
    position="2 0 0"
    rotation="0 90 -30"
    gesture-handler="minScale: 0.25; maxScale: 10"
  ></a-entity>
  <a-sound
    id="barkSound"
    src="url(/sounds/dog-barking.mp3)"
    autoplay="false"
    position="0 2 0"
  ></a-sound>
`;

export function initDogEvents() {
  const dog = document.querySelector('#dog');
  const scene = document.querySelector('#scene');
  const bark = document.querySelector('#barkSound');

  let isRunning = false;
  scene.addEventListener('click', () => {
    let clipName = 'Rest Pose';
    if (isRunning) {
      clipName = 'Rest Pose';
      bark.components?.sound?.stopSound();
    } else {
      clipName = 'run';
      bark.components?.sound?.playSound();
    }
    dog.setAttribute('animation-mixer', `clip: ${clipName}; loop: repeat`);
    isRunning = !isRunning;
  });
}
