// the callback function, seekBar, is a factory function. It returns an object that describes the directive's behavior to Angular's HTML compiler. This object communicates the behavior through options: templateUrl, replace, and restrict. templateUrl specifies a URL from which the directive will load a template. replace specifies what the template should replace. If true, the template replaces the directive's element. If false, the template replace the contents of the directive's element. restrict restricts the directive to a specific declaration style: element E, attribute A, class C, and comment M. If ommitted, the defaults (E and A) are used. Multiple restrictions are stringed together, i.e. AE or AEC. scope specifies that a new scope be created for the directive. link is responsible for registering DOM listeners and updating the DOM. This is where we put most of the directive logic. We've named the directive seekBar which means Angular will look for seek-bar in the HTML and call this directive when it finds that markup. restrict: 'E' instructs Angular to treat this directvie as an element. replace: true instructs Angular to completely replace the <seek-bar> element with the directive's HTML template rather than insert the HTML between the <seek-bar></seek-bar> tags. The templateUrl option specifies the path to the HTML template that the directive will use. Scoping the onChange attribute allows us the flexibility to specify how we want to handle the value passed on the on-change attribute. The & in the isolate scope object is a type of directive scope binding providing a way to execute an expression in the context of a parent scope. The link function is automatically generated and scoped to the element defining the directive. Think of it as a function that executes when the directive is instantiated in the view. Directive link functions take the same arguments with a strict order during declaration. The first argument is the scope object. Attributes and methods on the scope object are accessible within the directive's view. The second is the jqLite-wrapped element that the directive matches. The third is the hash of attributes with which the directive was declared  //
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
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        // scope.value holds the value of the seek bar such as the currently playing song time or the current volume //
        scope.value = 0;
        scope.max = 100;
        // hold the element that matches the directive(<seek-bar>) as a jQuery object so we can call jQuery methods on it //
        var seekBar = $(element);
        // notify the directive of all changes to attribute values by using the $observe method on the Angular attributes object. This code observes the values of the attributes we declare in the HTML by specifying the attribute name in the first argument. When the observed attribute is set or changed, we execute a callback(the second argument) that sets a new scope value (newValue) for the scope.value and scope.max attributes. We use the directive's scope to determine the location of the seek bar thumb and correspondingly the playback position of the song //
        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });
        
        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });
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
        scope.thumbStyle = function() {
          return {left: percentString()};
        };
        // update the seek bar value based on the seek bar's width and the location of the user's click on the seek bar //
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };
        // similar to scope.onClickSeekBar but uses $apply to contantly apply the change in value of scope.value as the user drags the seek bar thumb //
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });
          
          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };
        // test if scope.onChange is a function. If a future developer fails to pass a function to the on-change attribute in the HTML, the next line will not be reached, and no error will be thrown. Pass a full function call to the on-change attribute in the HTML - scope.onChange() calls the function in the attribute. The function we pass in the HTML has an argument, value, which isn't defined in the view. Using built-in Angular functionality, we specify the value of this argument using hash syntax to tell Angular to insert the local newValue variable as the value argument we pass into the SongPlayer.setCurrentTime() function called in the view //
        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange({value: newValue});
          }
        };
      }
    };
  }
  
  angular
  .module('blocJams')
  .directive('seekBar', ['$document', seekBar]);
})();