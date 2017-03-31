(function() {
    function CollectionCtrl() {
      // instead of using jQuery to append images, bind th edata from albumPicasso object to the Collection template //
      this.albums = [];
      for (var i=0; i < 12; i++) {
        this.albums.push(angular.copy(albumPicasso));
      }
    }
  
    angular
      .module('blocJams')
      .controller('CollectionCtrl', CollectionCtrl);
})();