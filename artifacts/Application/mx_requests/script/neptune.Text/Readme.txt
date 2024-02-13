******************************************************

-> When using the multimodel:
Copy the following code to the ajax Success of the api retrieving the multimodal data

paginationBar.run();
paginationBar.handlePagination();


-> When using the API call with restriction:
Copy the following code to the init or the action that triggers the Bar to be visible 

var options = {
    data: { table: "Your DB table" }
};

apioRestAPICount(options);

******************************************************

In both cases it's also necessary to choose the option on the JavaScript file paginationBar

******************************************************

Add this style class to the stylesheet

.toolPagination {
    border: none;
    height: 3rem;
}