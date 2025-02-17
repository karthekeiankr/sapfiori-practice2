sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
    "use strict";


    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            var oSmartTable = this.getView().byId("smartTable");
            // Attach event after data is received
            oSmartTable.attachDataReceived(this._calculateTotal.bind(this));


            // Create a JSON Model to store total value
            var oTotalModel = new JSONModel({ total: 0 });
            this.getView().setModel(oTotalModel, "totalModel");


            // Load the footer fragment
            this._loadFooterFragment();
        },

        _loadFooterFragment: function () {
            var oPage = this.getView().byId("pageId"); // Ensure your Page has an id="pageId"
           
            if (!this._oFooter) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.TotalFooter",
                    controller: this
                }).then(function (oFooter) {
                    this._oFooter = oFooter;
                    oPage.setFooter(oFooter);
                }.bind(this));
            }
        },


        _calculateTotal: function () {
            var oSmartTable = this.getView().byId("smartTable");
            var oTable = oSmartTable.getTable();


            if (!oTable) {
                console.error("Table not found inside SmartTable.");
                return;
            }


            var oBinding = oTable.getBinding("items");
            if (!oBinding) {
                console.warn("Table binding not found.");
                return;
            }


            var aContexts = oBinding.getCurrentContexts();
            var total = 0;


            // Calculate the total for the "number" column
            aContexts.forEach(function (oContext) {
                if (oContext && oContext.getObject()) {
                    total += parseFloat(oContext.getObject().Id || 0); // Change 'number' to your fieldname if different
                     } });
  // Update the total in the model
  var oTotalModel = this.getView().getModel("totalModel");
  oTotalModel.setProperty("/total", total.toFixed(2)); // Format total


  console.log("Updated Total:", total); // Debugging
}
});
});

