var $ = require('jquery');

var resultsTemplate = require('../views/results.hbs');

function showResults(store){
  var state = store.getState();
  // If we're not supposed to show the loading screen, bail
  if(!state.showResults){
    return;
  }

  var ctx = {
    name: state.name,
    dog: state.puppyList[state.hipsterLevel-1],
    puppyList: state.puppyList
  }

  $('#app').html(resultsTemplate(ctx));
}

module.exports = showResults;
