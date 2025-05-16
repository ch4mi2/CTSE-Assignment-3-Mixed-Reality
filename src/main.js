import { forestHTML, initForestEvents } from './models/forest.js';
import { initRobinEvents, robinHTML } from './models/robin.js';

const sceneHTML = `
  <a-scene embedded arjs="sourceType: webcam; facingMode: environment;">
    ${robinHTML}
    ${forestHTML}
    <a-entity camera></a-entity>
  </a-scene>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', sceneHTML);

  const scene = document.querySelector('a-scene');
  scene.addEventListener('loaded', () => {
    initRobinEvents();
    initForestEvents();
  });
});
