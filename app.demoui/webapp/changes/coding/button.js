sap.ui.define(
    [
        'sap/ui/core/mvc/ControllerExtension',
        'sap/m/MessageBox',
        'sap/m/Dialog',
        'sap/m/Table',
        'sap/m/Text',
        'sap/m/Button',
        'sap/ui/model/json/JSONModel'
    ],
    function (
        ControllerExtension,
        MessageBox,
        Dialog,
        Table,
        Text,
        Button,
        JSONModel
    ) {
        'use strict';

        return ControllerExtension.extend("customer.app.demoui.button", {
            // Define the JSON data
            _jsonData: [
                { "name": "John Doe", "age": 30 },
                { "name": "Jane Smith", "age": 25 },
                { "name": "Sam Johnson", "age": 35 }
            ],

            // Button Press Event
            onPress: function () {
                MessageBox.success("Successful");
            },

            // Button Click Event
            onClick: function () {
                MessageBox.success("Successful");
            },

            // Open Value Help Dialog
            onOpenValueHelp: function () {
                // Create a new dialog
                var oDialog = new Dialog({
                    title: "Select a Person",
                    content: [
                        new Table({
                            items: {
                                path: "/",
                                template: new sap.m.ColumnListItem({
                                    cells: [
                                        new Text({ text: "{name}" }),
                                        new Text({ text: "{age}" })
                                    ]
                                })
                            },
                            columns: [
                                new sap.m.Column({ header: new sap.m.Text({ text: "Name" }) }),
                                new sap.m.Column({ header: new sap.m.Text({ text: "Age" }) })
                            ]
                        })
                    ],
                    beginButton: new Button({
                        text: "Close",
                        press: function () {
                            oDialog.close();
                        }
                    }),
                    afterClose: function () {
                        oDialog.destroy();
                    }
                });

                // Set the JSON model for the dialog
                var oModel = new JSONModel(this._jsonData);
                oDialog.setModel(oModel);

                // Open the dialog
                oDialog.open();
            }
        });
    }
);
