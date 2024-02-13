if (toolPaginationShowItems.getVisible()) {
    paginationBar.pagination.take = parseInt(toolPaginationShowItems.getSelectedKey());
}

paginationBar.pagination.index = 0;
paginationBar.run(true); 
paginationBar.handlePagination();