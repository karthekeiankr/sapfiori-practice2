sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project4.controller.View1", {
        onInit() {
            
                var oModel = new sap.ui.model.odata.v4.ODataModel({
                    serviceUrl: "https://services.odata.org/V4/Northwind/Northwind.svc/",
                    synchronizationMode: "None"
                });
                this.getView().setModel(oModel);
            
            
        },
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
        
    });
});