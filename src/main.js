import { robinHTML, initRobinEvents } from './models/robin.js';

const sceneHTML = `
  <a-scene embedded arjs>
    ${robinHTML}


    <a-entity camera cursor="rayOrigin: mouse"></a-entity>
  </a-scene>
`;



document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', sceneHTML);

  const scene = document.querySelector('a-scene');
  scene.addEventListener('loaded', () => {
    initRobinEvents();
  });
});
