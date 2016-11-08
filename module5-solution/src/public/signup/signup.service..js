(function () {
"use strict";


angular.module('public')
.service('SignUpService', SignUpService);


function SignUpService() {
  var service = this;

  service.user = {};
  service.menu = {};

  service.setUserData = function (fname, lname, email, phone, favorite) {
	  service.user.fname = fname;
	  service.user.lname = lname;
	  service.user.email = email;
	  service.user.phone = phone;
	  service.user.favorite = favorite;
  }

  service.setMenuData = function (short_name, name, description) {
	  service.menu.short_name = short_name;
	  service.menu.name = name;
	  service.menu.description = description;
  }

  service.getUserData = function () {
	  return service.user;
  }

  service.getMenuData = function () {
	  return service.menu;
  }

}

})();
