(function () {
"use strict";

angular.module("MenuApp")
.component("categories", {
  templateUrl: "app/views/categories-list.html",
  bindings: {
    items: "<"
  }
});

})();