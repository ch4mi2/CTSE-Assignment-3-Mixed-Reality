export const elephantHTML = `
  <a-marker type='pattern' url='/markers/pattern-elephant.patt' id="elephant-marker">
    <a-entity
      id="elephant"
      gltf-model="url(/models/african_bush_elephant.glb)"
      scale="70 70 70"
      position="0 0 0"
      rotation="-30 270 90"
      class="clickable"
    ></a-entity>
    
    <a-sound
      id="elephantTrumpet"
      src="url(/sounds/elephant-trumpets.mp3)"
      preload="auto"
      volume="3"
      position="0 2 0"
    ></a-sound>

    <a-entity
      id="elephantInfo"
      text="width: 2; color: white; align: center; value: Elephants can rotate each ear independently, allowing them to listen in multiple directions simultaneously to detect predators and stay alert in their environment."
      position="0 3 0"
      rotation="-90 0 0"
      visible="false"
    ></a-entity>
  </a-marker>
  
  <!-- Place leaves sound outside the marker so it plays regardless of marker visibility -->
  <a-sound
    id="leavesRustle"
    src="url(/sounds/leaves-rustling.mp3)"
    autoplay="true"
    loop="true"
    position="0 0 0"
    volume="4"
  ></a-sound>
`;

export function initElephantEvents() {
  const elephantMarker = document.querySelector('#elephant-marker');
  const elephant = document.querySelector('#elephant');
  const elephantSound = document.querySelector('#elephantTrumpet');
  const leavesRustle = document.querySelector('#leavesRustle');
  
  let currentAnimation = "Stand_02";
  let animationSequenceStarted = false;
  
  // Initialize leaves sound to play continuously in the background
  function initBackgroundSound() {
    console.log("🌿 Initializing continuous background leaves sound");
    if (leavesRustle && leavesRustle.components && leavesRustle.components.sound) {
      leavesRustle.components.sound.playSound();
      
      // Check every few seconds that leaves sound is still playing
      setInterval(() => {
        if (leavesRustle.components && leavesRustle.components.sound && 
            !leavesRustle.components.sound.isPlaying) {
          leavesRustle.components.sound.playSound();
        }
      }, 5000);
    } else {
      setTimeout(initBackgroundSound, 2000);
    }
  }
  
  // Call once at startup and also when scene loads
  document.addEventListener('DOMContentLoaded', initBackgroundSound);
  document.querySelector('a-scene').addEventListener('loaded', initBackgroundSound);
  
  
  // Animation states
  const ANIMATIONS = {
    STAND: "Stand_02",
    TRANS_TO_LAYING: "Trans_Stand_To_Lying",
    LAYING: "Lying_01",
    STAND_UP: "Stand_01",
    STANDUP: "Stand_00",
    ROAR: "Roar"
  };
  
  
  // Check if the 3D model has loaded properly
  if (elephant) {
    elephant.addEventListener('model-loaded', () => {
      try {
        const mixer = elephant.components['animation-mixer'];
        if (mixer && mixer.mixer) {
          console.log("Animation mixer available:", mixer);
        } else {
          console.log("Animation mixer not available yet");
        }
      } catch (e) {
        console.log("Error checking animations:", e);
      }
    });

    elephant.addEventListener('model-error', (error) => {
      console.error("🐘 Error loading 3D model:", error);
    });
  }
  
  if (elephantMarker && elephantSound && elephant) {
    // When marker is found
    elephantMarker.addEventListener('markerFound', () => {
      console.log("Marker found, starting animation sequence");
      
      if (!animationSequenceStarted) {
        animationSequenceStarted = true;
        startAnimationSequence();
      } else {
        console.log("Animation sequence already in progress");
      }
    });
    
    // When marker is lost
    elephantMarker.addEventListener('markerLost', () => {
      console.log("Marker lost, stopping elephant sound and resetting");
      // Only stop the elephant trumpet sound, leave the rustling leaves playing
      elephantSound.components?.sound?.stopSound();
      
      animationSequenceStarted = false;
      resetElephant();
    });
    
  } else {
    console.error("Critical components missing:", { 
      marker: !elephantMarker, 
      elephant: !elephant, 
      sound: !elephantSound,
      leaves: !leavesRustle
    });
  }
  
  function startAnimationSequence() {
    if (!elephant.hasAttribute('animation-mixer')) {
      elephant.setAttribute('animation-mixer', {});
    }
    
    //Start with Stand_02 without trumpet sound
    elephant.setAttribute('animation-mixer', {
      clip: ANIMATIONS.STAND,
      loop: 'repeat'
    });
    currentAnimation = ANIMATIONS.STAND;

    //Change to transition animation
    setTimeout(() => {
      elephant.setAttribute('animation-mixer', {
        clip: ANIMATIONS.TRANS_TO_LAYING,
        loop: 'once',
        clampWhenFinished: true
      });
      currentAnimation = ANIMATIONS.TRANS_TO_LAYING;
      try {
        elephantSound.components?.sound?.playSound();
      } catch (e) {
        console.error("Error playing trumpet sound:", e);
      }
      
      //Check if animation is actually playing
      setTimeout(() => {
        try {
          const mixer = elephant.components['animation-mixer'];
          if (mixer && mixer.mixer) {
            console.log("Current actions:", mixer.mixer._actions);
            console.log("Is animation playing:", mixer.isPlaying);
          }
        } catch (e) {
          console.error("Error checking animation status:", e);
        }
      }, 500);
      
      //After transition completes, set to laying down
      console.log("Scheduling change to Lying_Down in 3 seconds");
      setTimeout(() => {
        elephant.setAttribute('animation-mixer', {
          clip: ANIMATIONS.LAYING,
          loop: 'repeat'
        });
        currentAnimation = ANIMATIONS.LAYING;
        
        //Check if this animation exists and is playing
        setTimeout(() => {
          try {
            const mixer = elephant.components['animation-mixer'];
            console.log("Lying animation status:", mixer?.isPlaying);
          } catch (e) {
            console.error("Error checking lying animation:", e);
          }
        }, 500);
        
        //After lying down period, transition back to standing
        console.log("🐘 Scheduling stand up transition in 8 seconds");
        setTimeout(() => {
          elephant.setAttribute('animation-mixer', {
            clip: ANIMATIONS.STAND_UP,
            loop: 'once',
            clampWhenFinished: true
          });
          currentAnimation = ANIMATIONS.STAND_UP;
          try {
            elephantSound.components?.sound?.playSound();
          } catch (e) {
            console.error("Error playing trumpet sound:", e);
          }
          
          //After stand up transition completes, return to standing
          setTimeout(() => {
            elephant.setAttribute('animation-mixer', {
              clip: ANIMATIONS.STAND,
              loop: 'repeat'
            });
            currentAnimation = ANIMATIONS.STAND;
  
          }, 3000); 
        }, 10000); 
      }, 8000); 
    }, 8000); 
  }
  
  function resetElephant() {
    console.log("Resetting elephant to initial state");
    elephant.setAttribute('animation-mixer', {
      clip: ANIMATIONS.STAND,
      loop: 'repeat'
    });
    elephant.setAttribute('rotation', '-30 270 90');
    currentAnimation = ANIMATIONS.STAND;
    console.log("Reset completed, current animation:", currentAnimation);
  }
}