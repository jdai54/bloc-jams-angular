// SongPlayer service as two private attributes: currentSong and currentBuzzObject, two private functions: setSong and playSong, and two public methods: SongPlayer.play and SongPlayer.pause //
(function() {
  function SongPlayer() {
    // within the SongPlaye service create a variable "SongPlayer" and set it to an empty object. The service returns this object, making its properties and methods public to the rest of the application //
    var SongPlayer = {};
    var currentSong = null;
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio files as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      // if the currently playing song is not the same as the song the user clicks on, then we want to stop the currently playing song, if there is one, set a new Buzz sound object, set the newly chosen song object as the currentSong, play the new Buzz sound object //
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentSong = song;
    };
    /**
    * @function playSong
    * @desc Play the currentBuzzObject and set the playing property of the song object to true
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    // add a play method to the SongPlayer service. Takes an argument, song, which we'll get from the Album view when a user clicks the play button; the ngRepeat directive used in the Album view template will dictate which song to pass into the function. The play method creates a new Buzz object using the song's audioUrl property and then calls Buzz's own play method n the object //
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };
    // the pause method requires less logic because we don't need to check for various conditions - a song must already be playing before it can be triggered // 
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();