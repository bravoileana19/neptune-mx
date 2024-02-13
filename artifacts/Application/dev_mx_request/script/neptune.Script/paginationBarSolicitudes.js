var paginationBarSolicitudes = {
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

        if (!keepIndex) paginationBarSolicitudes.pagination.index = 0;

        // Records to Get
        pagination = {
            take: paginationBarSolicitudes.pagination.take,
            skip: paginationBarSolicitudes.pagination.take * paginationBarSolicitudes.pagination.index
        }


        //Example
        //MultiModel with all the data

        paginationBarSolicitudes.pagination.count= modelMultiModelSolicitudes.getData().length;
        modelTblSolicitudes.setData( modelMultiModelSolicitudes.getData().slice( paginationBarSolicitudes.pagination.take *paginationBarSolicitudes.pagination.index , 
                                          paginationBarSolicitudes.pagination.take +( paginationBarSolicitudes.pagination.index *paginationBarSolicitudes.pagination.take)))

        //OR
        //Api Call with restriction 

        // var opts = {
        //     parameters: {
        //         take: paginationBarSolicitudes.pagination.take,
        //         skip: paginationBarSolicitudes.pagination.take * paginationBarSolicitudes.pagination.index
        //     }
        // }

        // apiYour_API(opts);

    },
    handlePagination() {

        var maxIndex = (paginationBarSolicitudes.pagination.count / paginationBarSolicitudes.pagination.take);
        maxIndex = Math.ceil(maxIndex);

        if (paginationBarSolicitudes.pagination.count <= paginationBarSolicitudes.pagination.take) maxIndex = 1;

        toolPaginationFirst1.setEnabled(true);
        toolPaginationPrev1.setEnabled(true);
        toolPaginationNext1.setEnabled(true);
        toolPaginationLast1.setEnabled(true);

        if (paginationBarSolicitudes.pagination.index < 0) paginationBarSolicitudes.pagination.index = 0;

        if (paginationBarSolicitudes.pagination.index === 0) {
            toolPaginationFirst1.setEnabled(false);
            toolPaginationPrev1.setEnabled(false);
        }

        if ((paginationBarSolicitudes.pagination.index + 1) >= maxIndex) {
            toolPaginationNext1.setEnabled(false);
            toolPaginationLast1.setEnabled(false);
        }

        toolPaginationPages1.destroyItems();

        var numItems = 0;
        var maxItems = paginationBarSolicitudes.configuration.maxNumberOfButtons - 1;
        var startItem = Number.parseInt(paginationBarSolicitudes.pagination.index - (maxItems / 2));

        if (startItem < 0) startItem = 0;

        for (i = startItem; i < maxIndex; i++) {
            if (numItems <= maxItems) toolPaginationPages1.addItem(new sap.m.SegmentedButtonItem({ text: i + 1, key: i }));
            numItems++;
        }

        toolPaginationPages1.setSelectedKey(paginationBarSolicitudes.pagination.index);
        toolPaginationTitle1.setNumber((paginationBarSolicitudes.pagination.index + 1) + "/" + maxIndex);

    }
}
