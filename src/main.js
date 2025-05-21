import { lionessHTML, initLionessEvents } from './models/lioness.js';
import { forestHTML, initForestEvents } from './models/forest.js';
import { initRobinEvents, robinHTML } from './models/robin.js';
import { elephantHTML, initElephantEvents } from './models/elephant.js';

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
 
  ${robinHTML}

  ${lionessHTML}
  ${elephantHTML}
    <a-entity camera cursor="rayOrigin: mouse"></a-entity>
  </a-scene>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', sceneHTML);

  const scene = document.querySelector('a-scene');
  scene.addEventListener('loaded', () => {
    initRobinEvents();
    initLionessEvents();
    initForestEvents();
    initElephantEvents();
  });
});
