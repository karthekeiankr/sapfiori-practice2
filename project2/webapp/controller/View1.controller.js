sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "project2/utils/Base64Converter"
], (Controller,Base64Converter) => {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit() {
        },
        // downloadpdf: function(){
        //     console.log("hai")
        //     var rows = [];
        //     var oBinding= this.byId("table").getBinding("items");
        //     var jsonData=oBinding.getModel().getProperty(oBinding.getPath())
        //     var that = this;

        //     jsonData.forEach(function (item) {
        //         var row = [];
        //         Object.keys(item).forEach(function (key) {
        //             row.push(item[key]);
        //         });
        //         rows.push(row);
        //     });
        //     var docDefinition = {
        //         content: [
        //             {
        //                 style: "header",
        //                 alignment: "center",
        //                 text: "Report"
        //             }
        //             , {
        //                 table: {
        //                     headerRows: 1,
        //                     widths: ["*", "*", "*", "*", "*"],
        //                     body: [
        //                         ["Name", "Role", "Skills", "Phone", "Address"], 
        //                         ...rows
        //                     ]
        //                 }
        //             },
        //             {
        //                 style: "footer",
        //                 alignment: "center",
        //                 text: "Report",
        //                 image:"data:image/jpeg;base64,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"
        //             }
        //         ]
        //     };
            
        //     var pdfDocGenerator = pdfMake.createPdf(docDefinition);
        //     pdfDocGenerator.download("table.pdf");
            
        // },
        // downloadpdf: function() {
        //     console.log("hai");
        //     var that = this;
        //     var imageUrl = sap.ui.require.toUrl("project2/model/dmix-download.jpg"); // Ensure correct path
        
        //     var rows = [];
        //     var oBinding = this.byId("table").getBinding("items");
        //     var jsonData = oBinding.getModel().getProperty(oBinding.getPath());
        
        //     jsonData.forEach(function (item) {
        //         var row = [];
        //         Object.keys(item).forEach(function (key) {
        //             row.push(item[key]);
        //         });
        //         rows.push(row);
        //     });
        
        //     function getBase64Image(url, callback) {
        //         var img = new Image();
        //         img.crossOrigin = "Anonymous"; // Avoid CORS issues
        //         img.onload = function() {
        //             var canvas = document.createElement("canvas");
        //             canvas.width = img.width;
        //             canvas.height = img.height;
        //             var ctx = canvas.getContext("2d");
        //             ctx.drawImage(img, 0, 0);
        //             var dataURL = canvas.toDataURL("image/png"); // Convert to Base64
        //             callback(dataURL);
        //         };
        //         img.onerror = function() {
        //             console.error("Image not found or cannot be loaded:", url);
        //         };
        //         img.src = url;
        //     }
        
        //     getBase64Image(imageUrl, function(base64Image) {
        //         var docDefinition = {
        //             content: [
        //                 {
        //                     image: base64Image,
        //                     width: 100,
        //                     alignment: 'center',
        //                     margin: [0, 0, 0, 10]
        //                 },
        //                 {
        //                     style: "header",
        //                     alignment: "center",
        //                     text: "Report"
        //                 },
        //                 {
        //                     table: {
        //                         headerRows: 1,
        //                         widths: ["*", "*", "*", "*", "*"],
        //                         body: [
        //                             ["Name", "Role", "Skills", "Phone", "Address"], 
        //                             ...rows
        //                         ]
        //                     }
        //                 },
        //                 {
        //                     style: "footer",
        //                     alignment: "center",
        //                     text: "Report"
        //                 }
        //             ]
        //         };
        
        //         pdfMake.createPdf(docDefinition).download("Report.pdf");
        //     });
        // },
        // downloadpdf: function () {
        //     console.log("Generating PDF...");
        //     var that = this;
        //     var imageUrl = sap.ui.require.toUrl("project2/model/dmix-download.jpg"); // Ensure correct path
        
        //     var rows = [];
        //     var oBinding = this.byId("table").getBinding("items");
        //     var jsonData = oBinding.getModel().getProperty(oBinding.getPath());
        
        //     jsonData.forEach(function (item) {
        //         var row = [];
        //         Object.keys(item).forEach(function (key) {
        //             row.push(item[key]);
        //         });
        //         rows.push(row);
        //     });
        
        //     // Call the Base64 Converter function
        //     Base64Converter.convertImageToBase64(imageUrl, function (base64Image) {
        //         console.log(base64Image);
                
        //         if (!base64Image) {
        //             console.error("Failed to convert image to Base64");
        //             return;
        //         }
        
        //         var docDefinition = {
        //             content: [
        //                 // Logo fixed at top-left
        //                 {
        //                     image: base64Image,
        //                     width: 100,
        //                     absolutePosition: { x: 40, y: 20 } // Top-left position
        //                 },
        //                 // Report Title
        //                 {
        //                     style: "header",
        //                     alignment: "center",
        //                     margin: [0, 60, 0, 20], // Adjust margin to avoid overlap with the logo
        //                     text: "Report"
        //                 },
        //                 // Table
        //                 {
        //                     table: {
        //                         headerRows: 1,
        //                         widths: ["*", "*", "*", "*", "*"],
        //                         body: [
        //                             ["Name", "Role", "Skills", "Phone", "Address"],
        //                             ...rows
        //                         ]
        //                     },
        //                     layout: 'lightHorizontalLines' // Optional for better styling
        //                 },
        //                 // Footer below the table (within content)
        //                 {
        //                     text: "This is an automatically generated report.",
        //                     alignment: "center",
        //                     margin: [0, 10, 0, 10],
        //                     fontSize: 10,
        //                     bold: true
        //                 }
        //             ],
        //             // Separate Footer at the Bottom of the Page
        //             footer: function (currentPage, pageCount) {
        //                 return {
        //                     columns: [
        //                         { text: "Confidential Report", alignment: "left", margin: [40, 0, 0, 10] },
        //                         { text: "Page " + currentPage + " of " + pageCount, alignment: "right", margin: [0, 0, 40, 10] }
        //                     ]
        //                 };
        //             }
        //         };
        
        //         pdfMake.createPdf(docDefinition).download("Report.pdf");
        //     });
        // },

        downloadpdf: function () {
            console.log("Generating PDF... ");
        
            var that = this;
            var sHeaderImagePath = sap.ui.require.toUrl("project2/utils/headerimage.txt"); // First logo
            var sFooterImagePath = sap.ui.require.toUrl("project2/utils/content.txt"); // Second logo

        
            // Fetch both Base64 images
            Promise.all([
                fetch(sHeaderImagePath).then(response => response.text()),
                fetch(sFooterImagePath).then(response => response.text())
            ])
            .then(([base64HeaderImage, base64FooterImage]) => {
                that.generatePDF(base64HeaderImage, base64FooterImage);
            })
            .catch(error => {
                console.error("Error loading Base64 images:", error);
            });
        },
        
        generatePDF: function (base64HeaderImage, base64FooterImage) {
            var rows = [];
            var oBinding = this.byId("table").getBinding("items");
            var jsonData = oBinding.getModel().getProperty(oBinding.getPath());
        
            jsonData.forEach(function (item) {
                var row = [];
                Object.keys(item).forEach(function (key) {
                    row.push(item[key]);
                });
                rows.push(row);
            });
        
            var docDefinition = {
                content: [
                    // Header Logo
                    {
                        image: base64HeaderImage,
                        width: 100,
                        absolutePosition: { x: 40, y: 20 } // Adjusted for better positioning
                    },
                    // Report Title
                    {
                        style: "header",
                        alignment: "center",
                        margin: [0, 60, 0, 20], // Adjusted to prevent overlap with logo
                        text: "Report"
                    },
                    // Table
                    {
                        table: {
                            headerRows: 1,
                            widths: ["*", "*", "*", "*", "*"],
                            body: [
                                ["Name", "Role", "Skills", "Phone", "Address"],
                                ...rows
                            ]
                        },
                        layout: 'lightHorizontalLines' // Better readability
                    },
                    // Footer Notice (Above the Footer)
                    {
                        text: "This is an automatically generated report.",
                        alignment: "center",
                        margin: [0, 20, 0, 10], // Increased margin
                        fontSize: 10,
                        bold: true 
                    }
                ],
                // Footer Section
                footer: function (currentPage, pageCount) {
                    return {
                        margin: [40, -10, 40, 10],
                        table: {
                            widths: ['30%', '40%', '30%'],
                            body: [
                                [
                                    { image: base64HeaderImage, width: 120, alignment: "left", border: [1,1,1,1] },
                                  
                                    { image: base64FooterImage, width: 120, alignment: "right", border: [1,1,1,1] }
                                ]
                            ]
                        }
                    };
                }
                
                
                
                
                
                
                            
            };
        
            pdfMake.createPdf(docDefinition).download("Report.pdf");
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
        
            // Request all contexts for OData V4
            oBinding.requestContexts().then(function (aContexts) {
                var total = 0;
        
                // Calculate the total for the "Id" column (change field name if necessary)
                aContexts.forEach(function (oContext) {
                    if (oContext && oContext.getObject()) {
                        total += parseFloat(oContext.getObject().Phone || 0);
                    }
                });
        
                // Update the total in the model
                var oTotalModel = this.getView().getModel("totalModel");
                oTotalModel.setProperty("/total", total.toFixed(2)); // Format total
        
                console.log("Updated Total:", total); // Debugging
            }.bind(this)).catch(function (oError) {
                console.error("Error fetching data:", oError);
            });
        },
        onUpdatePhone1: function () {
            var oTable = this.getView().byId("table"); // Get table reference
            var aItems = oTable.getItems(); // Get all rows
        
            aItems.forEach(function (oItem) {
                var aCells = oItem.getCells(); // Get all cells in the row
                var iRole = parseInt(aCells[1].getText(), 10) || 0;  // Role value
                var iSkills = parseInt(aCells[2].getText(), 10) || 0; // Skills value
        
                var iUpdatedPhone = iRole * iSkills; // Custom calculation
        
                aCells[3].setText(iUpdatedPhone); // Update Phone column dynamically
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
                var iRole = parseInt(aCells[1].getText(), 10) || 0;  // Role value
                var iSkills = parseInt(aCells[2].getText(), 10) || 0; // Skills value
                var iUpdatedPhone;
        
                if (index === 0) {
                    // First row: Phone = Role + Skills
                    iUpdatedPhone = iRole + iSkills;
                } else {
                    // Subsequent rows: Phone = PreviousRowPhone + Skills - Role
                    iUpdatedPhone = iPreviousPhone + iSkills - iRole;
                }
        
                // Update the Phone column dynamically
                aCells[3].setText(iUpdatedPhone);
        
                // Store the current row's phone value for the next row
                iPreviousPhone = iUpdatedPhone;
            });
        
            sap.m.MessageToast.show("Phone numbers updated in the UI!");
        }
        
        
        
    });
});