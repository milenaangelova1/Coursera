(function () {
"use strict";


angular.module('public')
.component('signUp', {
  templateUrl: 'src/public/signup/sign-up.component.html',
  controller: SignUpController
});


SignUpController.$inject = ['SignUpService', 'MenuSearchService'];
function SignUpController(SignUpService, MenuSearchService) {
  var ctrl = this;

  ctrl.user = SignUpService.getUserData();
  ctrl.menu = SignUpService.getMenuData();

  ctrl.submit = function () {
    var promise = MenuSearchService.searchDish(ctrl.user.favorite);

    promise.then(function (response) {
        ctrl.response = response;
        console.log(ctrl.response);

        if(ctrl.response.status == 200) {
          ctrl.isDishNotFound = false;
          ctrl.isSaved = true;
          SignUpService.setUserData(ctrl.user.firstname, ctrl.user.lastname, ctrl.user.email, ctrl.user.phone, ctrl.user.favorite);
          SignUpService.setMenuData(response.data.short_name, response.data.name, response.data.description);
        }
        else {
          ctrl.isDishNotFound = true;
          ctrl.isSaved = false;
        }
      })
      .catch(function (error) {
        console.log("Error: " + error);
        ctrl.isDishNotFound = true;
        ctrl.isSaved = false;
      });
    
  }

}

})();
