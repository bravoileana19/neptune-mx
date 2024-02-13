if (toolPaginationShowItems1.getVisible()) {
    paginationBarSolicitudes.pagination.take = parseInt(toolPaginationShowItems1.getSelectedKey());
}

paginationBarSolicitudes.pagination.index = 0;
paginationBarSolicitudes.run(true); 
paginationBarSolicitudes.handlePagination();