/**
 * Puppy Constructor
 */

function Person(){

}

function Puppy(config){
  config = config || {};

  this.lick = function(who){
    who.wetness += 10;
  }

  return Object.assign({}, this, config);
}


module.exports = Puppy;
