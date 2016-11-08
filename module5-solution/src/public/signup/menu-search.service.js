(function () {
"use strict";


angular.module('public')
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://digsi.herokuapp.com/");

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.searchDish = function (searchTerm) {
   return $http({
     method: "GET",
     url: (ApiBasePath + "/menu_items/"+searchTerm+".json")
   });

  }

}

})();
