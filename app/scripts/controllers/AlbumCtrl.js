(function() {
  // inject the custom Fixtures service into the controller by passing it as the paramenter and as a dependency //
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }
  
  angular
    .module('blocJams')
    // add Fixtures to AlbumCtrl's array of dependencies. Once injected the service is available for use within the controller //
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();

