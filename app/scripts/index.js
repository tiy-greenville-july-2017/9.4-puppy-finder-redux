var $ = require('jquery');
var Redux = require('redux');

var indexTemplate = require('../templates/index.hbs');
var loadingTemplate = require('../templates/loading.hbs');
var resultsTemplate = require('../templates/results.hbs');

var RUN_SEARCH = 'RUN_SEARCH';
var UPDATE_PROGRESS = 'UPDATE_PROGRESS';
var SEARCH_ENDED = 'SEARCH_ENDED';

var INITIAL_STATE = {
  showLoading: false,
  showResults: false,
  progressWidth: 0,
  name: undefined,
  hipsterLevel: 0
};

var hipsterDogs = [
  'Ozzy',
  'Kepler',
  'Oscar',
  'Jim',
  'Pierre'
];

function puppyReducer(state, action){

  switch(action.type){
    case RUN_SEARCH:
      state.name = action.name;
      state.hipsterLevel = action.hipsterLevel;
      state.showLoading = true;
      break;

    case UPDATE_PROGRESS:
      state.progressWidth = action.progressWidth;
      break;


    case SEARCH_ENDED:
      state.showLoading = false;
      state.showResults = true;
      break;

    default:
      break;
  }

  return state;
}

var store = Redux.createStore(puppyReducer, INITIAL_STATE);
store.subscribe(showLoading);
store.subscribe(doLoadingBar);
store.subscribe(showResults);

function showHome(){
  $('#app').html(indexTemplate());

  $('#puppy-search').on('submit', function(e){
    e.preventDefault();

    var name = $('#name').val();
    var hipsterLevel = $('#hipster-level').val();

    store.dispatch({type: RUN_SEARCH, name: name, hipsterLevel: hipsterLevel});
  });
}

function showLoading(){
  var state = store.getState();
  // If we're not supposed to show the loading screen, bail
  if(!state.showLoading){
    return;
  }

  $('#app').html(loadingTemplate(state));
}

function showResults(){
  var state = store.getState();
  // If we're not supposed to show the loading screen, bail
  if(!state.showResults){
    return;
  }

  var ctx = {
    name: state.name,
    dog: hipsterDogs[state.hipsterLevel-1]
  }

  $('#app').html(resultsTemplate(ctx));
}

function doLoadingBar(){
  var state = store.getState();

  if(state.showLoading && state.progressWidth == 0){
    var intervalId = window.setInterval(function(){
      var currentProgress = store.getState().progressWidth;

      if(currentProgress < 100){
        store.dispatch({type: UPDATE_PROGRESS, progressWidth: currentProgress + 5});
      }else{
        window.clearInterval(intervalId);
        store.dispatch({type: SEARCH_ENDED});
      }
    }, 100);
  }

}

// Kick the tires, light the fires
// Who let the dogs out...
showHome();
