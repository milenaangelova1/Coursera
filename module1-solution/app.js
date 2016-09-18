(function() {
    angular.module("LunchCheck", [])
    .controller("LunchCheckController", ['$scope', LunchCheckController]);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
         $scope.message = "";
         function splitString(lunch_menu, separator) {
            return lunch_menu.split(separator);
        };

        $scope.checkMenu = function() {
            var menu_string = $scope.lunchMenu;
            
            if (menu_string != null) {
                length_of_array = splitString(menu_string, ',').length;
                console.log(menu_string.length);
                if(menu_string.length > 0 && length_of_array <= 3) {
                    $scope.message = "Enjoy!";
                } else if(length_of_array > 3) {
                    $scope.message = "Too much!";
                } else {
                    $scope.message = "Please enter data first";
                }
            } else {
                $scope.message = "Please enter data first";
            }
        }; 
    };
})();