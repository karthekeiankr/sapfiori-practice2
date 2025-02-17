sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("project3.controller.Products", {
        onInit: function () {
            var oView = this.getView();

            // Load product model
            var oProductModel = new JSONModel("model/products.json");
            oView.setModel(oProductModel, "data");

            // Load cart from LocalStorage
            var aCartData = JSON.parse(localStorage.getItem("cart")) || { Cart: [] };
            var oCartModel = new JSONModel(aCartData);
            oView.setModel(oCartModel, "cart");
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var oTable = this.getView().byId("productTable");
            var oBinding = oTable.getBinding("items");

            if (!sQuery) {
                oBinding.filter([]);
                return;
            }
            if (!sQuery) {  // If field is empty, show error state
                sQuery.setValueState("Error");
                sQuery.setValueStateText("This field is required!");
            } else {
                sQuery.setValueState("None");  // Reset if valid
            }

            var oFilterName = new Filter("Name", FilterOperator.Contains, sQuery);
            var oFilterDescription = new Filter("Description", FilterOperator.Contains, sQuery);

            var oFinalFilter = new Filter({
                filters: [oFilterName, oFilterDescription],
                and: false
            });

            oBinding.filter([oFinalFilter]);
        },

        onAddToCart: function (oEvent) {
            var oSelectedItem = oEvent.getSource().getParent(); // Get the button's parent row
            var oProductData = oSelectedItem.getBindingContext("data").getObject();
        
            // Get cart model
            var oCartModel = this.getView().getModel("cart");
            var aCartItems = oCartModel.getProperty("/Cart") || [];
        
            // Check if product already exists in cart
            var oExistingItem = aCartItems.find(item => item.Name === oProductData.Name);
            if (oExistingItem) {
                sap.m.MessageToast.show("Product is already in the cart!");
                return;
            }
        
            // Add product to cart
            aCartItems.push(oProductData);
            oCartModel.setProperty("/Cart", aCartItems); // Update UI model immediately
        
            // Save updated cart data to localStorage
            localStorage.setItem("cart", JSON.stringify({ Cart: aCartItems }));
        
            // Refresh UI manually
            oCartModel.refresh(true);
        
            sap.m.MessageToast.show("Added to Cart: " + oProductData.Name);
        },

        onGoToCart: function () {
            // Reload the cart data before navigation
            var aCartData = JSON.parse(localStorage.getItem("cart")) || { Cart: [] };
            var oCartModel = this.getView().getModel("cart");
            oCartModel.setProperty("/Cart", aCartData.Cart);
            oCartModel.refresh(true); // Ensure UI updates
        
            // Navigate to the cart page
            this.getOwnerComponent().getRouter().navTo("cart");
        }
        
    });
});
