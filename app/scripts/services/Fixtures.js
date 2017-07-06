// Fixtures service using the Factory recipe. .factory() designates the use of the Factory recipe. Within the Fixtures function, we declar a variable and set it to an empty object. The factory will return this object and make its properties and methods available to other parts of our Angular app //
(function() {
  function Fixtures() {
    var Fixtures = {};

    var albumPicasso = {
      title: 'The Colors',
      artist: 'Pablo Picasso',
      label: 'Cubism',
      year: '1881',
      albumArtUrl: 'assets/images/album_covers/01.png',
      songs: [
        { title: 'Blue', duration: 161.71, audioUrl: '/assets/music/blue' },
        { title: 'Green', duration: 103.96, audioUrl: '/assets/music/green' },
        { title: 'Red', duration: 268.45, audioUrl: '/assets/music/red' },
        { title: 'Pink', duration: 153.14, audioUrl: '/assets/music/pink' },
        { title: 'Magenta', duration: 374.22, audioUrl: '/assets/music/magenta' }
      ]
    };

    var albumGoblin = {
      title: 'Goblin OST',
      artist: 'Chan Yeol of EXO feat. Punch',
      label: 'CJ E&M Music',
      year: '2016',
      albumArtUrl: '/assets/images/album_covers/goblin.jpg',
      songs: [
        { title: 'Stay With Me', duration: 192.05, audioUrl: '/assets/music/staywithme' },
        { title: 'My Eyes', duration: 157.08, audioUrl: '/assets/music/myeyes' },
        { title: 'Hush', duration: 245.06, audioUrl: '/assets/music/hush' },
        { title: 'Beautiful', duration: 227.65, audioUrl: '/assets/music/beautiful' },
        { title: 'You Are So Beautiful', duration: 196.02, audioUrl: '/assets/music/youaresobeautiful' },
        { title: 'Who Are You', duration: 255.12, audioUrl: '/assets/music/whoareyou'},
        { title: 'I Miss You', duration: 170.09, audioUrl: '/assets/music/imissyou'}
      ]
    };

    var albumPororo = {
      title: 'Pororo Sing Along',
      artist: 'Pororo Band',
      label: 'Iconix',
      year: '2015',
      albumArtUrl: '/assets/images/album_covers/PororoBand.jpg',
      songs: [
        { title: 'Opening', duration: 38.00, audioUrl: '/assets/music/pororo_sing_along/Opening' },
        { title: 'Rabbit Frog', duration: 181.00, audioUrl: '/assets/music/pororo_sing_along/Rabbit frog' },
        { title: 'Good Morning', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Good morning' },
        { title: 'Hide and Seek', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Hide and Seek' },
        { title: 'Playing with Numbers', duration: 182.00, audioUrl: '/assets/music/pororo_sing_along/Playing with numbers' },
        { title: 'Rainbow', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Rainbow' },
        { title: 'Naughty Boy', duration: 179.00, audioUrl: '/assets/music/pororo_sing_along/Naughty boy' },
        { title: 'Good Child', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Good Child' },
        { title: 'For Sure', duration: 179.00, audioUrl: '/assets/music/pororo_sing_along/For Sure' },
        { title: 'Ding Dong Dang', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Ding Dong Dang' },
        { title: 'Para Pam', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Para Pam' },
        { title: 'It\'s Alright', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Its Alright' },
        { title: 'Mommy Pig, Baby Pig', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Mommy Pig Baby Pig' },
        { title: 'Lovely Baby Bear', duration: 180.00, audioUrl: '/assets/music/pororo_sing_along/Lovely baby bear' },
        { title: 'Ending', duration: 29.00, audioUrl: '/assets/music/pororo_sing_along/Ending' }
      ]
    };
    // use this service to pull the album data into our app by adding a public getAlbum method. This service is a "Plain Old JavaScript Object" (POJO). Components that inject this ervice as a dependency can access the public methods of the object - that is, the properties and methods that are returned //
    Fixtures.getAlbum = function() {
      return albumPororo;
    };

    Fixtures.getCollection = function(numberOfAlbums) {
      var albumArray = [];
      for (i=0; i < numberOfAlbums; i++) {
        albumArray.push(albumPororo);
      }
      return albumArray;
    };

    return Fixtures;
  }

  angular
    .module('blocJams')
    .factory('Fixtures', Fixtures);
})();
