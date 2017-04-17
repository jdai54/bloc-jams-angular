// filter functions must return another function which takes at least one argument, the input of the filter, seconds, in this case. Filters do not need to be injected as a dependency unless used within the code of an Angular component (service, directive, or controller) //
(function() {
  function timecode() {
    return function(seconds) {
      var output = buzz.toTimer(seconds);
      
      return output;
    };
  }
  
  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();