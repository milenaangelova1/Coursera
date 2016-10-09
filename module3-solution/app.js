(function(){

    angular.module('NarrowItDownApp', [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .constant("ApiBasePath", "http://davids-restaurant.herokuapp.com")
        .directive("foundItems", FoundItems);
        
        NarrowItDownController.$inject = ['$scope','MenuSearchService'];
        function NarrowItDownController($scope, MenuSearchService) {
            var narrowCtrl = this;

            narrowCtrl.shortName = '';
            narrowCtrl.found = [];
            narrowCtrl.errorMessage = false;

            narrowCtrl.getMatchedMenuItems = function() {
                var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
                
                promise.then(function(response){
                    if(response.length !== 0) {
                        narrowCtrl.errorMessage = false;
                        narrowCtrl.found = response;
                    } else {
                        narrowCtrl.errorMessage = true;
                    }
                })
                .catch(function(error){
                    console.log("Something went terribly wrong.");
                    narrowCtrl.errorMessage = true;
                });
            };

            narrowCtrl.removeItem = function(itemIndex) {
                narrowCtrl.found.splice(itemIndex, 1);
            };
        };

        MenuSearchService.$inject = ['$http', 'ApiBasePath'];
        function MenuSearchService($http, ApiBasePath) {
            var service = this;

           service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: 'GET',
				url: ApiBasePath + '/menu_items.json'
			}).then(function (response) {
				var data = response.data;
			    var found = [];

			    if(!searchTerm) {
			    	return [];
			    }

			    for(var i in data.menu_items) {
			    	var menuItem = data.menu_items[i];
			    	if(menuItem.description.toLowerCase().indexOf(searchTerm) >= 0 
			    		|| menuItem.name.toLowerCase().indexOf(searchTerm) >= 0) 
			    	{
			    		found.push(menuItem);
			    	}
			    }
		    
			    return found;
			});
		}

        };

        function FoundItems(){
            var ddo = {
                templateUrl: 'list-items.html',
                scope: {
                    items: '<',
                    onRemove: '&',
                    errorMessage: '<'
                },
                controller: NarrowItDownController,
                controllerAs: 'list',
                bindToController: true 
            };
            return ddo;
        };
       
})();