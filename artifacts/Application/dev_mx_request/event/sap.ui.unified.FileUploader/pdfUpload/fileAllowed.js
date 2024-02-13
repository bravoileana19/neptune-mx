//This code triggers when we have successfully uploaded a file.
console.log("File Allowed");

//Take the file from the FileUploader object.
var file = pdfUpload.oFileUpload.files[0];

var fileReader = new FileReader();
var base64;
var pdf;
 
fileReader.onload = function(fileLoadedEvent) {
    //Get the base64 representation
    base64 = fileLoadedEvent.target.result;
    //Strip the header data.
    pdf = base64.slice(28,base64.length);

    //This is used as a placeholder to save the data for the submission.
    pdfEncoding.setText(pdf);
    
    //convert the PDF into a URL
    var pdfurl = createDataURL(pdf);
    PDFViewer.setSource(pdfurl)
    PDFViewer.setVisible(true);
    
};

// Convert data to base64
fileReader.readAsDataURL(file);

// //To display the pdf we need to represent it as a data URL.
// function createDataURL(pdf){
//     //Register BLOBs on the application.
//     jQuery.sap.addUrlWhitelist("blob");
//     //convert the base64 to binary and insert it in a byte array.
//     var decodedPdfContent = atob(pdf);
//     var byteArray = new Uint8Array(decodedPdfContent.length)
//     for(var i=0; i<decodedPdfContent.length; i++){
//         byteArray[i] = decodedPdfContent.charCodeAt(i);
//     }
//     //create a BLOB and a URL
//     var blob = new Blob([byteArray.buffer], { type: 'application/pdf' });
//     var pdfurl = URL.createObjectURL(blob);

//     return pdfurl;
// }