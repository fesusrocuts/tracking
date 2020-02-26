angular.module('app')
.directive('validateSearchDirective', function() {
    return {
        require: 'ngModel',
        link: function($scope, element, attr, $controller) {
            function validateDate(value) {
              console.log("validarFechaDirective > validateDate");
              console.log(value);
              console.log(element.attr("name"));
                /*if (value.indexOf("e") > -1) {
                    element.parent().css( "background-color", "red" );
                    //mCtrl.$setValidity('charE', true);
                } else {
                    element.parent().css( "background-color", "blue" );
                    //mCtrl.$setValidity('charE', false);
                }*/
                return value;
            }
            $controller.$parsers.push(validateDate);
        }
    };
})
