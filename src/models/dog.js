export const dogHTML = `
    <a-entity
      gltf-model="url(/models/dog.glb)"
      animation-mixer="clip: Rest Pose; loop: repeat"
      scale="2 2 2"
      position="0 0 0"
      rotation="0 90 90"
    ></a-entity>
`;

export function initRobinEvents() {
  const hiroMarker = document.querySelector('#hiro-marker');
}
