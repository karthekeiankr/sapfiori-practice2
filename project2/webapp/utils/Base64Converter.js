sap.ui.define([], function () {
    "use strict";

    return {
        convertImageToBase64: function (imageUrl, callback) {
            var img = new Image();
            img.crossOrigin = "Anonymous"; // Avoid CORS issues

            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/png"); // Convert to Base64
                callback(dataURL);
            };

            img.onerror = function () {
                console.error("Image not found or cannot be loaded:", imageUrl);
                callback(null); // Return null if image loading fails
            };

            img.src = imageUrl;
        }
    };
});
