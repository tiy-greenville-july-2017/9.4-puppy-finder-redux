var $ = require('jquery');
var Redux = require('redux');

var actionTypes = require('./action_types');

var showHome = require('./controllers/home');
var showLoading = require('./controllers/loading');
var showResults = require('./controllers/results');

var Puppy = require('./models/puppy');

var puppyList = [
  new Puppy({name: 'Ozzy', pic: ''}),
  new Puppy({name: 'Kepler', pic: ''}),
  new Puppy({name: 'Oscar', pic: ''}),
  new Puppy({name: 'Jim', pic: ''}),
  new Puppy({name: 'Pierre', pic: ''})
];

var INITIAL_STATE = {
  showLoading: false,
  showResults: false,
  progressWidth: 0,
  name: undefined,
  hipsterLevel: 0,
  puppyList: puppyList
};

function puppyReducer(state, action){

  switch(action.type){
    case actionTypes.RUN_SEARCH:
      state.name = action.name;
      state.hipsterLevel = action.hipsterLevel;
      state.showLoading = true;
      break;

    case actionTypes.UPDATE_PROGRESS:
      state.progressWidth = action.progressWidth;
      break;

    case actionTypes.SEARCH_ENDED:
      state.showLoading = false;
      state.showResults = true;
      break;

    default:
      break;
  }

  return state;
}

var store = Redux.createStore(puppyReducer, INITIAL_STATE);
store.subscribe(function(){showLoading(store)});
store.subscribe(function(){showResults(store)});


// Kick the tires, light the fires
// Who let the dogs out...
showHome(store);
