(function(){

    angular.module('ShoppingListCheckOff', [])
        .controller("ToBuyShoppingController", ToBuyShoppingController)
        .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

        ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
        function ToBuyShoppingController(ShoppingListCheckOffService) {
            var toBuyCtrl = this;

            toBuyCtrl.items = ShoppingListCheckOffService.getBuyItems();
            toBuyCtrl.isEmpty = ShoppingListCheckOffService.isBuyItemsEmpty();

            toBuyCtrl.transferItems = function(index) {
                ShoppingListCheckOffService.transferItems(index);
            };
        };

        AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
        function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
            var toBoughtCtrl = this;

            toBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
            toBoughtCtrl.isEmpty = ShoppingListCheckOffService.isBoughtItemsEmpty();
            console.log(toBoughtCtrl.isEmpty);
        };

        function ShoppingListCheckOffService() {
            var service = this;
            var boughtItems = [];
            var buyItemsEmpty = '';
            var boughtItemsEmpty = true;

            var buyItems = [
                { name: "cookie", quantity: 10},
                { name: "wafles", quantity: 5},
                { name: "sandwaches", quantity: 10}
            ];

            service.getBuyItems = function() {
                return buyItems;
            };

            service.getBoughtItems = function() {
                return boughtItems;
            };

            service.transferItems = function(index) {
                boughtItems.push(buyItems[index]);
                buyItems.splice(index, 1);

                if(buyItems.length == 0)
                    buyItemsEmpty = true;

                if(boughtItems.length == 1) 
                    boughtItemsEmpty = false;
            };

            service.isBuyItemsEmpty = function() {
                return buyItemsEmpty;
            };

            service.isBoughtItemsEmpty = function() {
                return boughtItemsEmpty;
            };
        };
})();