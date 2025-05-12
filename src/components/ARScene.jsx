import React from "react";

const ARScene = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <a-scene embedded arjs>
          <a-marker preset="hiro">
            <a-box position="0 0.5 0" material="color: red;"></a-box>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
        `,
      }}
    />
  );
};

export default ARScene;
