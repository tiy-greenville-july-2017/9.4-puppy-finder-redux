var $ = require('jquery');
var _ = require('lodash');

var actionTypes = require('../action_types');
var loadingTemplate = require('../views/loading.hbs');


function showLoading(store){
  var state = store.getState();
  // If we're not supposed to show the loading screen, bail
  if(!state.showLoading){
    return;
  }

  var ctx = {
    progressWidth: state.progressWidth,
    randomPuppy: _.sample(state.puppyList)
  };

  $('#app').html(loadingTemplate(ctx));

  console.log(state.progressWidth );
  if(state.progressWidth == 0){
    startLoadingBar(store);
  }
}

function startLoadingBar(store){
  var state = store.getState();
  console.log('start loading');
  var intervalId = window.setInterval(function(){
    var currentProgress = state.progressWidth;

    if(currentProgress < 100){
      store.dispatch({type: actionTypes.UPDATE_PROGRESS, progressWidth: currentProgress + 5});
    }else{
      window.clearInterval(intervalId);
      store.dispatch({type: actionTypes.SEARCH_ENDED});
    }
  }, 100);
}

module.exports = showLoading;
