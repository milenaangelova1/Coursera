(function () {
"use strict";

angular.module("data")
.service("MenuDataService", MenuDataService)
.constant("baseUrl", "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ["$http", "baseUrl"]
function MenuDataService($http, baseUrl) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (baseUrl + "/categories.json")
    }).then(function (response) {
      return response.data;
    })
  };

  service.getItemsForCategory= function (categoryShortName) {
    return $http({
      method: "GET",
      url: (baseUrl + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    }).then(function (response) {
      return response.data;
    })
  };
}
})();
