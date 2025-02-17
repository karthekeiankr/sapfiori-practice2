sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project3.controller.Cart", {
        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("cart").attachPatternMatched(this.onCartRouteMatched, this);
        },

        onCartRouteMatched: function () {
            this.loadCart();
        },

        loadCart: function () {
            var sCartData = localStorage.getItem("cart");
            var oCartData = sCartData ? JSON.parse(sCartData) : { Cart: [] };

            // Ensure each item has a unique ID
            oCartData.Cart.forEach(item => {
                if (!item.uniqueId) {
                    item.uniqueId = this.generateUniqueId();
                }
            });

            var oCartModel = new JSONModel(oCartData);
            this.getView().setModel(oCartModel, "cart");
            oCartModel.refresh(true);
        },

        generateUniqueId: function () {
            return 'cart-' + Math.random().toString(36).substr(2, 9);
        },

        onIncreaseQuantity: function (oEvent) {
            var sUniqueId = oEvent.getSource().getCustomData()[0].getValue();
            var oCartModel = this.getView().getModel("cart");
            var aCartItems = oCartModel.getProperty("/Cart");

            aCartItems.forEach(item => {
                if (item.uniqueId === sUniqueId) {
                    item.quantity += 1;
                }
            });

            this.updateCart(aCartItems);
        },

        onDecreaseQuantity: function (oEvent) {
            var sUniqueId = oEvent.getSource().getCustomData()[0].getValue();
            var oCartModel = this.getView().getModel("cart");
            var aCartItems = oCartModel.getProperty("/Cart");

            aCartItems.forEach(item => {
                if (item.uniqueId === sUniqueId && item.quantity > 1) {
                    item.quantity -= 1;
                }
            });

            this.updateCart(aCartItems);
        },

        onRemoveItem: function (oEvent) {
            var sUniqueId = oEvent.getSource().getCustomData()[0].getValue();
            var oCartModel = this.getView().getModel("cart");
            var aCartItems = oCartModel.getProperty("/Cart");

            var aUpdatedCart = aCartItems.filter(item => item.uniqueId !== sUniqueId);

            this.updateCart(aUpdatedCart);
        },

        updateCart: function (aCartItems) {
            var oCartData = { Cart: aCartItems };
            localStorage.setItem("cart", JSON.stringify(oCartData));

            var oCartModel = this.getView().getModel("cart");
            oCartModel.setProperty("/Cart", aCartItems);
            oCartModel.refresh(true);

            MessageToast.show("Cart updated successfully!");
        }
    });
});
