import { robinHTML, initRobinEvents } from './models/robin.js';
import { dogHTML, initDogEvents } from './models/dog.js';

const sceneHTML = `
  <a-scene 
    arjs
    embedded  
    renderer="logarithmicDepthBuffer: true;"
    vr-mode-ui="enabled: false"
    gesture-detector
    id="scene"
  >
   <a-marker preset="hiro" id="hiro-marker">
    ${robinHTML}
    ${dogHTML}
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', sceneHTML);

  const scene = document.querySelector('a-scene');
  scene.addEventListener('loaded', () => {
    initRobinEvents();
    initDogEvents();
  });
});
