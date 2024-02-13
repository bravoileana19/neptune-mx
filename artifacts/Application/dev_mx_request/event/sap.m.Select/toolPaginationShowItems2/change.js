if (toolPaginationShowItems2.getVisible()) {
    paginationBarLiberadas.pagination.take = parseInt(toolPaginationShowItems2.getSelectedKey());
}

paginationBarLiberadas.pagination.index = 0;
paginationBarLiberadas.run(true); 
paginationBarLiberadas.handlePagination();