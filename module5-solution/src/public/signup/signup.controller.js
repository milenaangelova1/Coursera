(function() {
"use strict";

angular.module('public')
    .controller("SignUpController", SignUpController);

SignUpController.$inject = ['SignUpService', 'MenuSearchService'];
function SignUpController(SignUpService, MenuSearchService) {
    var signup = this;

    signup.user = SignUpService.getUserData();
    signup.menu = SignUpService.getMenuData();

    signup.submit = function() {
        var promise = MenuSearchService.searchMeal(signup.user.favorite);

        promise.then(function(response) {
            signup.response = response;

            if (signup.response.status == 200) {
                signup.isNotFoundMeal = false;
                signup.isSaved = true;
                SignUpService.setUserData(signup.user.fname, signup.user.lname, signup.user.email, signup.user.phone, signup.user.favourite);
                SignUpService.setMenuData(response.data.short_name, response.data.name, response.data.description);
            } else {
                signup.isNotFoundMeal = true;
                signup.isSaved = false;
            }
        })
        .catch(function(error) {
             signup.isNotFoundMeal = true;
             signup.isSaved = false;
        });
    }
    
};

})();