// the callback function, seekBar, is a factory function. It returns an object that describes the directive's behavior to Angular's HTML compiler. This object communicates the behavior through options: templateUrl, replace, and restrict. templateUrl specifies a URL from which the directive will load a template. replace specifies what the template should replace. If true, the template replaces the directive's element. If false, the template replace the contents of the directive's element. restrict restricts the directive to a specific declaration style: element E, attribute A, class C, and comment M. If ommitted, the defaults (E and A) are used. Multipel restrictions are stringed together, i.e. AE or AEC. scope specifies that a new scope be created for the directive. link is responsible for registering DOM listeners and updating the DOM. This is where we put most of the directive logic. We've named the directive seekBar which means Angular will look for seek-bar in the HTML and call this directive when it finds that markup. restrict: 'E' instructs Angular to treat this directvie as an element. replace: true instructs Angular to completely replace the <seek-bar> element with the directive's HTML template rather than insert the HTML between the <seek-bar></seek-bar> tags. The templateUrl option specifies the path to the HTML template that the directive will use. Declaring an empty scope property ensures that a new scope will exist solely for the directive.The link function is automatically generated and scoped to the element defining the directive. Think of it as a function that executes when the directive is instantiated in the view. Directive link functions take the same arguments with a strict order during declaration. The first argument is the scope object. Attributes and methods on the scope object are accessible within the directive's view. The second is the jqLite-wrapped element that the directive matches. The third is the hash of attributes with which the directive was declared  //
(function() {
  function seekBar($document) {
    // Calculate the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred //
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };
    
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        // scope.value holds the value of the seek bar such as the currently playing song time or the current volume //
        scope.value = 0;
        scope.max = 100;
        // hold the element that matches the directive(<seek-bar>) as a jQuery object so we can call jQuery methods on it //
        var seekBar = $(element);
        // this function calculates a percent based on the value and maximum value of a seek bar //
        var percentString = function () {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };
        // return the width of the seek bar fill element based on the calculate percent //
        scope.fillStyle = function() {
          return {width: percentString()};
        };
        // update the seek bar value based on teh seek bar's width and the location of the user's click on the seek bar //
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };
        // similar to scope.onClickSeekBar but uses $apply to contantly apply the change in value of scope.value as the user drags the seek bar thumb //
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });
          
          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };
      }
    };
  }
  
  angular
  .module('blocJams')
  .directive('seekBar', ['$document', seekBar]);
})();