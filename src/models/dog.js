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
`;

export function initDogEvents() {
  const dog = document.querySelector('#dog');
  const scene = document.querySelector('#scene');
  if (!dog) {
    console.warn('Dog entity not found in DOM');
    return;
  }

  let isRunning = false;
  scene.addEventListener('click', () => {
    const clipName = isRunning ? 'Rest Pose' : 'run';
    dog.setAttribute('animation-mixer', `clip: ${clipName}; loop: repeat`);
    isRunning = !isRunning;
  });
}
