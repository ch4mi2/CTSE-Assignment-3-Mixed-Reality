import { dogHTML, initDogEvents } from './models/dog.js';
import { forestHTML, initForestEvents } from './models/forest.js';
import { initRobinEvents, robinHTML } from './models/robin.js';

const sceneHTML = `
  <a-scene 
    arjs
    embedded 
    renderer="logarithmicDepthBuffer: true;"
    vr-mode-ui="enabled: false"
    gesture-detector
    id="scene"
  >
  ${forestHTML}
   <a-marker preset="hiro" id="hiro-marker">
    ${robinHTML}


    ${dogHTML}
    </a-marker>
    <a-entity camera cursor="rayOrigin: mouse"></a-entity>
  </a-scene>
`;



document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', sceneHTML);

  const scene = document.querySelector('a-scene');
  scene.addEventListener('loaded', () => {
    initRobinEvents();
    initDogEvents();
    initForestEvents();
  });
});
