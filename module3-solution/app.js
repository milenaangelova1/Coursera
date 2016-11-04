(function(){

    angular.module('NarrowItDownApp', [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", FoundItems)
        .constant("ApiBasePath", "http://davids-restaurant.herokuapp.com");
        
        NarrowItDownController.$inject = ['MenuSearchService'];
        function NarrowItDownController(MenuSearchService) {
            var narrowCtrl = this;

            narrowCtrl.found = [];
            narrowCtrl.isEmpty = true;
            narrowCtrl.numberOfSearches = 0;

            narrowCtrl.getMatchedMenuItems = function(searchTerm) {
                narrowCtrl.numberOfSearches++;
                if(searchTerm !== '') {
                    narrowCtrl.found = [];
                    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                    promise.then(function(response){
                        narrowCtrl.found = response;
                        if(narrowCtrl.found.length === 0)
                            narrowCtrl.isEmpty = true;
                        else
                            narrowCtrl.isEmpty = false;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    narrowCtrl.isEmpty = true;
                }
            };

            narrowCtrl.removeItem = function(itemIndex) {
                narrowCtrl.found.splice(itemIndex, 1);
            };
        };

        MenuSearchService.$inject = ['$http', 'ApiBasePath'];
        function MenuSearchService($http, ApiBasePath) {
            var service = this;

           service.getMatchedMenuItems = function(searchTerm) {
               var totalItems = [];
               var foundItems = [];

                return $http({
                    method: 'GET',
                    url: (ApiBasePath + '/menu_items.json')
                }).then(function (response) {
                    totalItems = response.data.menu_items;
            
                    for (var i = 0; i < totalItems.length; i++) {
                        var name = totalItems[i].name;
                        if (name.toLowerCase().indexOf(searchTerm)!== -1) {
                            foundItems.push(totalItems[i]);
                    }
                }
                return foundItems;
            })
		}
        };

        function FoundItems(){
            var ddo = {
                templateUrl: 'list-items.html',
                scope: {
                    found: '<',
                    isEmpty: '<',
                    onRemove: '&',
                    numberOfSearches: '<'
                },
                controller: NarrowItDownController,
                controllerAs: 'narrowCtrl',
                bindToController: true 
            };
            return ddo;
        };
       
})();