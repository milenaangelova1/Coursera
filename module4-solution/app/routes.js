(function () {
"use strict";

angular.module("MenuApp")
.config(RoutesConfig);

RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/"); 
  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "app/views/home.html"
  })

  .state("categories", {
    url: "/categories",
    templateUrl: "app/views/categories.html",
    controller: "CategoriesController as categoriesList",
    resolve: {
      items: ["MenuDataService", function (MenuDataService) {
        return MenuDataService.getAllCategories()
          .then(function (items) {
            return items;
          });
      }]
    }
  })
  .state("items", {
    url: "/items/{categoryShortName}",
    templateUrl: "app/views/items.html",
    controller: "ItemsController as itemsList",
    resolve: {
      items: ["$stateParams", "MenuDataService",
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
            .then(function (items) {
              return items;
            });
        }]
    }
  });
}
})();
