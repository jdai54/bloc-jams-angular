// SongPlayer service as one private attributes: currentBuzzObject, four private functions: setSong, playSong, stopSong, and getSongIndex, one public attribute: SongPlayer.currentSong and four public methods: SongPlayer.play, SongPlayer.pause, SongPlayer.previous, and SongPlayer.next //
(function() {
  function SongPlayer(Fixtures) {
    // within the SongPlaye service create a variable "SongPlayer" and set it to an empty object. The service returns this object, making its properties and methods public to the rest of the application //
    var SongPlayer = {};
    /**
    * @desc stores the album information
    * @type {Object}
    */ 
    var currentAlbum = Fixtures.getAlbum();
    
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
        SongPlayer.currentSong.playing = null;
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      SongPlayer.currentSong = song;
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
    /**
    * @function stopSong
    * @desc Stop the currentBuzzObject and set the playing property of the song object to null
    * @param {Object} song
    */
    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    }
    /**
    * @function getSongIndex
    * @desc Get the index of a song object
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;
    // add a play method to the SongPlayer service. Takes an argument, song, which we'll get from the Album view when a user clicks the play button; the ngRepeat directive used in the Album view template will dictate which song to pass into the function. The play method creates a new Buzz object using the song's audioUrl property and then calls Buzz's own play method n the object //
    SongPlayer.play = function(song) {
      // we use || to tell the function: assign the value of song or the value of SongPlayer.currentSong to the song variable. The first condition occurs when we call the methods from the Album view's song rows, and the second condition occurs when we call the methods from the player bar //
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    // the pause method requires less logic because we don't need to check for various conditions - a song must already be playing before it can be triggered // 
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    /**
    * @function SongPlayer.previous
    * @desc Go to the previous song 
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      // if user is on the first song, stop the currently playing song and set the value of the currently playing song to the first song //
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
        // if currentSongIndex is not less than zero, move to the previous song and play it //
        // if currentSongIndex is not less than zero, move to the previous song and play it //
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    /**
    * @function SongPlayer.next
    * @desc Go to the next song 
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      // if user is on the last song, move to the first song in the album and play it //
      if (currentSongIndex >= (currentAlbum.songs.length)) {
        var song = currentAlbum.songs[0];
        setSong(song);
        playSong(song);
        // if currentSongIndex is not less than zero, move to the previous song and play it //
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();