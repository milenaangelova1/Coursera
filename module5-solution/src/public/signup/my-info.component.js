(function () {
"use strict";


angular.module('public')
.component('myInfo', {
  templateUrl: 'src/public/signup/my-info.component.html',
  controller: MyInfoController
});


MyInfoController.$inject = ['SignUpService', 'MenuSearchService', 'ApiBasePath'];
function MyInfoController(SignUpService, MenuSearchService, ApiBasePath) {
  var ctrl = this;

  ctrl.user = SignUpService.getUserData();
  ctrl.menu = SignUpService.getMenuData();
  ctrl.basePath = ApiBasePath;
  
  if(ctrl.user.firstname != null && 
     ctrl.user.lastname != null &&
     ctrl.user.email != null &&
     ctrl.user.favorite != null) {
    ctrl.userExists = true;
  }
}

})();
