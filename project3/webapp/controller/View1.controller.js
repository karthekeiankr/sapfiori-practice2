sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent", // Import UIComponent
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/comp/valuehelpdialog/ValueHelpDialog",
    "sap/m/Column",
    "sap/m/Label",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/ui/layout/VerticalLayout",
    "sap/m/Select",
    "sap/m/Input",
    "sap/m/Button"
], function (Controller, UIComponent, MessageToast, ODataModel, ValueHelpDialog, Column, Label, ColumnListItem, Text, VerticalLayout, Select, Input, Button) {
    "use strict";

    return Controller.extend("project3.controller.View1", {
        _oDialog: null, // Initialize dialog variable
        _aSelectedRows: [], // Initialize array to hold selected row contexts

        onInit: function () {
            // Initialization logic
        },

        onTabSelect: function (oEvent) {
            var sKey = oEvent.getParameter("key");
            UIComponent.getRouterFor(this).navTo(sKey); // Use UIComponent correctly
        },
        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("value");
            var oTable = this.getView().byId("table");
       
            if (!oTable) {
                console.error("Table not found!");
                return;
            }       
            var oBinding = oTable.getBinding("items");
       
            if (!oBinding) {
                console.warn("Table binding not found!");
                return;
            }
       
            console.log("Search Query:", sQuery);
       
            var aFilters = [];
       
            if (sQuery) {
                if (!isNaN(sQuery)) {  
                    // If query is a number, use EQ filter on Id
                    var oIdFilter = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.EQ, parseInt(sQuery, 10));
                    aFilters.push(oIdFilter);
                } else {
                    // If query is a string, use StartsWith on Material_Name
                    var oNameFilter = new sap.ui.model.Filter("Material_Name", sap.ui.model.FilterOperator.StartsWith, sQuery);
                    aFilters.push(oNameFilter);
                }
       
                console.log("Applying Filters:", aFilters);
                oBinding.filter(aFilters);
            } else {
                console.log("Clearing Filters");
                oBinding.filter([]);
            }
        },
        

        onSearch1: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("value");
            var oTable = this.getView().byId("table");

            if (!oTable) {
                console.error("Table not found!");
                return;
            }

            var oBinding = oTable.getBinding("items");

            if (!oBinding) {
                console.warn("Table binding not found!");
                return;
            }

            console.log("Search Query:", sQuery);

            var aFilters = [];

            if (sQuery) {
                if (!isNaN(sQuery)) {  
                    var oIdFilter = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.EQ, parseInt(sQuery, 10));
                    aFilters.push(oIdFilter);
                } else {
                    var oNameFilter = new sap.ui.model.Filter("Material_Name", sap.ui.model.FilterOperator.StartsWith, sQuery);
                    aFilters.push(oNameFilter);
                }

                console.log("Applying Filters:", aFilters);
                oBinding.filter(aFilters);
            } else {
                console.log("Clearing Filters");
                oBinding.filter([]);
            }
        },

        onSearch2: function () {
            var oTable = this.getView().byId("table");
            var oBinding = oTable.getBinding("items");

            if (!oBinding) {
                console.warn("Table binding not found!");
                return;
            }

            var aFilters = [];

            var sId = this.getView().byId("searchId").getValue();
            var sMaterialName = this.getView().byId("searchMaterialName").getValue();
            var sMaterialDes = this.getView().byId("searchMaterialDes").getValue();
            var sQuantity = this.getView().byId("searchQuantity").getValue();
            var sCity = this.getView().byId("searchCity").getValue();

            if (sId) {
                aFilters.push(new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.Contains, sId));
            }
            if (sMaterialName) {
                aFilters.push(new sap.ui.model.Filter("Material_Name", sap.ui.model.FilterOperator.Contains, sMaterialName));
            }
            if (sMaterialDes) {
                aFilters.push(new sap.ui.model.Filter("Material_Des", sap.ui.model.FilterOperator.Contains, sMaterialDes));
            }
            if (sQuantity) {
                aFilters.push(new sap.ui.model.Filter("Quantity", sap.ui.model.FilterOperator.Contains, sQuantity));
            }
            if (sCity) {
                aFilters.push(new sap.ui.model.Filter("City", sap.ui.model.FilterOperator.Contains, sCity));
            }

            oBinding.filter(aFilters);
        },
        onUpdatePhone1: function () {
            var oTable = this.getView().byId("table"); // Get table reference
            var aItems = oTable.getItems(); // Get all rows
        
            aItems.forEach(function (oItem) {
                var aCells = oItem.getCells(); // Get all cells in the row
                var iRole = parseInt(aCells[0].getText(), 10) || 0;  // Role value
                var iSkills = parseInt(aCells[3].getText(), 10) || 0; // Skills value
        
                var iUpdatedPhone = iRole + iSkills; // Custom calculation
        
                aCells[4].setText(iUpdatedPhone); // Update Phone column dynamically
            });
        },
        onUpdatePhone: function () {
            var oTable = this.getView().byId("table"); // Get table reference
            var aItems = oTable.getItems(); // Get all rows
        
            if (aItems.length === 0) {
                sap.m.MessageToast.show("No data available in the table.");
                return;
            }
        
            var iPreviousPhone = 0; // To store previous row's phone value
        
            aItems.forEach(function (oItem, index) {
                var aCells = oItem.getCells(); // Get all cells in the row
                var iRole = parseInt(aCells[0].getText(), 10) || 0;  // Role value
                var iSkills = parseInt(aCells[3].getText(), 10) || 0; // Skills value
                var iUpdatedPhone;
        
                if (index === 0) {
                    // First row: Phone = Role + Skills
                    iUpdatedPhone = iRole + iSkills;
                } else {
                    // Subsequent rows: Phone = PreviousRowPhone + Skills - Role
                    iUpdatedPhone = iPreviousPhone + iSkills - iRole;
                }
        
                // Update the Phone column dynamically
                aCells[4].setText(iUpdatedPhone);
        
                // Store the current row's phone value for the next row
                iPreviousPhone = iUpdatedPhone;
            });
        
            sap.m.MessageToast.show("Phone numbers updated in the UI!");
        }
        
    });
});
