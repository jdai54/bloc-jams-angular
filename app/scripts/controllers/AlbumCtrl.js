(function() {
  // inject the custom Fixtures service into the controller by passing it as the paramenter and as a dependency //
  function AlbumCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }
  
  angular
    .module('blocJams')
    // add Fixtures to AlbumCtrl's array of dependencies. Once injected the service is available for use within the controller. Also since we will be playing music from the album view, the SongPlayer service is injected into AlbumCtrl //
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();

