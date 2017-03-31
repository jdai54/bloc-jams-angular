(function() {
  function LandingCtrl() {
    // to initialize a $scope object, a controller attaches properties to it, here the heroTitle property to LandingCtrl. Using the this keyword adds heroTitle as a property on the LandingCtrl's $scope object. $scope properties contain the model, or data, that the view will present, and are available to the template at the point in the DOM where the controller is registered. The LandingCtrol for BlocJams is registered for the landing.html template
    this.heroTitle = "Turn the Music Up!";
  }
  
  angular
    .module('blocJams')
    // controller method has two parameters: the name of the controller. A callback function or an array that injects dependencies, with a callback function as the last item in the array. Object constructors like LandingCtrl are capitalized by convention to distinguish them from other functions
    .controller('LandingCtrl', LandingCtrl);
})();