import { elephantHTML, initElephantEvents } from './models/elephant.js';
import { forestHTML, initForestEvents } from './models/forest.js';
import { initLionessEvents, lionessHTML } from './models/lioness.js';
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
  ${robinHTML}
  ${lionessHTML}
  ${forestHTML}
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
