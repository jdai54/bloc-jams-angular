(function() {
  function SongPlayer() {
    // within the SongPlaye service create a variable "SongPlayer" and set it to an empty object. The service returns this object, making its properties and methods public to the rest of the application //
    var SongPlayer = {};
    // add a play method to the SongPlayer service. Takes an argument, song, which we'll get from the Album view when a user clicks the play button; the ngRepeat directive used in the Album view template will dictate which song to pass into the function. The play method creates a new Buzz object using the song's audioUrl property and then calls Buzz's own play method n the object //
    SongPlayer.play = function(song) {
      var currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentBuzzObject.play();
    };
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();