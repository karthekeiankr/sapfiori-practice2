sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, JSONModel) {
    "use strict";
  
    return Controller.extend("xlupload.controller.View1", {
      onInit: function () {
        this.getView().setModel(new JSONModel({ fileData: [] }));
        console.log("OData Model check:", this.getView().getModel());
      },
       // download xlsx.full.min.js from google and use it here
      onFileUpload: function (oEvent) {
        const oFileUploader = oEvent.getSource();
        const oFile = oFileUploader.getFocusDomRef().files[0];
        const that = this;
  
        if (!oFile) return;
  
        const fileName = oFile.name.toLowerCase();
  
        const reader = new FileReader();
  
        if (fileName.endsWith(".csv")) {
          reader.onload = function (e) {
            const text = e.target.result;
            const lines = text.split("\n");
            const headers = lines[0].trim().split(",");
            const data = [];
  
            for (let i = 1; i < lines.length; i++) {
              const row = lines[i].trim();
              if (!row) continue;
              const values = row.split(",");
              const obj = {};
              headers.forEach((header, index) => {
                obj[header.trim()] = values[index]?.trim();
              });
              data.push(obj);
            }
  
            that.getView().getModel().setProperty("/fileData", data);
            sap.m.MessageToast.show("CSV file loaded");
          };
  
          reader.readAsText(oFile);
        } else if (fileName.endsWith(".xlsx")) {
          

          reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' }); 
            var worksheet = workbook.Sheets[workbook.SheetNames[0]];
            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
            var headers = jsonData[0];
            var rows = jsonData.slice(1);
          
            var formattedData = rows.map(row => {
              var obj = {};
              headers.forEach((header, index) => {
                var key = header.trim();
                switch (key) {
                  case "Id":
                    obj["Id"] = row[index].toString();
                    break;
                  case "Name":
                    obj["Name"] = row[index];
                    break;
                  case "City":
                    obj["City"] = row[index];
                    break;
                }
              });
              return obj;
            });
          
            that.getView().getModel().setProperty("/fileData", formattedData);
            console.log(formattedData)
            sap.m.MessageToast.show("Excel file loaded");
          };
          
          reader.readAsArrayBuffer(oFile);  // ✅ keep this
          
        } else {
          sap.m.MessageToast.show("Unsupported file type. Please use .csv or .xlsx");
        }
      },
  
    

      onUploadData: function () {
  const oView = this.getView();
  const aData = oView.getModel().getProperty("/fileData");
  const oODataModel = oView.getModel("odata"); // <- OData model alias from manifest.json

  console.log("Data to upload:", aData);
  console.log("OData Model:", oODataModel);

  if (!aData || aData.length === 0) {
    sap.m.MessageToast.show("No data to upload.");
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  aData.forEach((entry, index) => {
    console.log("Uploading row:", entry);  // ✅ helpful debug
    oODataModel.create("/UPLOADSet", entry, {
      success: function () {
        successCount++;
        if (successCount + errorCount === aData.length) {
          sap.m.MessageToast.show(`${successCount} entries uploaded successfully. ${errorCount} failed.`);
        }
      },
      error: function (oError) {
        errorCount++;
        console.error("Upload failed for row " + (index + 1), oError);
        if (successCount + errorCount === aData.length) {
          sap.m.MessageToast.show(`${successCount} entries uploaded successfully. ${errorCount} failed.`);
        }
      }
    });
  });
},



// onUploadData: function () {    
//            const aData = this.getView().getModel().getProperty("/fileData");  
//            console.log(aData);           
//            const oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZXL_UPLOAD_SRV/");            
//             oODataModel.setUseBatch(false); // Avoid batch-related 500 errors             
//             aData.forEach((row,index) => {                 
//               const payload = {
//                Id: row.Id.toString(), 
//                 Name: row.Name,
//                 City: row.City
//               };
//               console.log("Payload:", payload);              
//               oODataModel.create("/UPLOADSet", payload, {                     
                
//                 success: () => sap.m.MessageToast.show("Uploaded: " +payload+ payload.Name),   
                            
//                 error: (oError) => {                         
//                   sap.m.MessageToast.show("Failed to upload: " + payload.Name);                         
//                   console.error("Upload error:", oError);                     
//                 }                 
//               });             
//             });         
//           },
 


      
    });
  });
  