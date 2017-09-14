var $ = require('jquery');

var actionTypes = require('../action_types');
var homeTemplate = require('../views/home.hbs');


function showHome(store){
  $('#app').html(homeTemplate());

  // $('.js-puppy-select').click(function(e){
  //   e.preventDefault();
  //   var puppyId = $(this).data('puppy-id');
  //   var selectedPuppy = hipsterDogs[puppyId];
  //   alert(selectedPuppy);
  // })

  $('#puppy-search').on('submit', function(e){
    e.preventDefault();

    var name = $('#name').val();
    var hipsterLevel = $('#hipster-level').val();

    store.dispatch({type: actionTypes.RUN_SEARCH, name: name, hipsterLevel: hipsterLevel});
  });
}

module.exports = showHome;
