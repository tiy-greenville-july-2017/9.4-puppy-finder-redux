/**
 * Single Page Applications Need to store "state" somewhere
 */

// We can just use a global object that keeps track of the things we need
var game = {
  showStartScreen: true,
  showCharacterScreen: false,
  playGame: false,
  selectedCharacter: null
};

// So when things happen on screen we can update the state
document.getElementById('start').addEventListener('click', function(){
  game.showStartScreen = false;
  game.showCharacterScreen = true;
});

// But this approach has problems like:
// How do other pieces of code get notified that the state has changed?
// How do we keep track of what actions make which state changes?
