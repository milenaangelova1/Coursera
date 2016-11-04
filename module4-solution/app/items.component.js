(function () {
"use strict";

angular.module("MenuApp")
.component("items", {
  templateUrl: "app/views/items-list.html",
  bindings: {
    items: "<"
  }
});

})();