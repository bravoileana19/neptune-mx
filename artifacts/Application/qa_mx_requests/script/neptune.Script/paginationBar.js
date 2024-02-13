var paginationBar = {
    configuration: {
        maxNumberOfButtons: 6 //number maximo of page buttons 
    },
    pagination: {
        take: 10,
        index: 0,
        count: 0
    },
    run: function (keepIndex) {

        // Pagination

        if (!keepIndex) paginationBar.pagination.index = 0;

        // Records to Get
        pagination = {
            take: paginationBar.pagination.take,
            skip: paginationBar.pagination.take * paginationBar.pagination.index
        }


        //Example
        //MultiModel with all the data

        // modelTblRechazadas.setData(resp);
        // TblRechazadas.setBusy(false);

        paginationBar.pagination.count= modelMultiModelRechazadas.getData().length;
        modelTblRechazadas.setData( modelMultiModelRechazadas.getData().slice( paginationBar.pagination.take *paginationBar.pagination.index , 
                                          paginationBar.pagination.take +( paginationBar.pagination.index *paginationBar.pagination.take)))

        //OR
        //Api Call with restriction 

        // var opts = {
        //     parameters: {
        //         take: paginationBar.pagination.take,
        //         skip: paginationBar.pagination.take * paginationBar.pagination.index
        //     }
        // }

        // apiYour_API(opts);

    },
    handlePagination() {

        var maxIndex = (paginationBar.pagination.count / paginationBar.pagination.take);
        maxIndex = Math.ceil(maxIndex);

        if (paginationBar.pagination.count <= paginationBar.pagination.take) maxIndex = 1;

        toolPaginationFirst.setEnabled(true);
        toolPaginationPrev.setEnabled(true);
        toolPaginationNext.setEnabled(true);
        toolPaginationLast.setEnabled(true);

        if (paginationBar.pagination.index < 0) paginationBar.pagination.index = 0;

        if (paginationBar.pagination.index === 0) {
            toolPaginationFirst.setEnabled(false);
            toolPaginationPrev.setEnabled(false);
        }

        if ((paginationBar.pagination.index + 1) >= maxIndex) {
            toolPaginationNext.setEnabled(false);
            toolPaginationLast.setEnabled(false);
        }

        toolPaginationPages.destroyItems();

        var numItems = 0;
        var maxItems = paginationBar.configuration.maxNumberOfButtons - 1;
        var startItem = Number.parseInt(paginationBar.pagination.index - (maxItems / 2));

        if (startItem < 0) startItem = 0;

        for (i = startItem; i < maxIndex; i++) {
            if (numItems <= maxItems) toolPaginationPages.addItem(new sap.m.SegmentedButtonItem({ text: i + 1, key: i }));
            numItems++;
        }

        toolPaginationPages.setSelectedKey(paginationBar.pagination.index);
        toolPaginationTitle.setNumber((paginationBar.pagination.index + 1) + "/" + maxIndex);

    }
}
