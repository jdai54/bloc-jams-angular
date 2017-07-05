(function() {
    function CollectionCtrl(Fixtures) {
      // instead of using jQuery to append images, bind the data from albumPicasso object to the Collection template //
      this.albums = Fixtures.getCollection(1);
    }

    angular
      .module('blocJams')
      .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
