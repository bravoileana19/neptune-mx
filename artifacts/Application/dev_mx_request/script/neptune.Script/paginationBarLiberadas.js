var paginationBarLiberadas = {
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

        if (!keepIndex) paginationBarLiberadas.pagination.index = 0;

        // Records to Get
        pagination = {
            take: paginationBarLiberadas.pagination.take,
            skip: paginationBarLiberadas.pagination.take * paginationBarLiberadas.pagination.index
        }


        //Example
        //MultiModel with all the data

        paginationBarLiberadas.pagination.count= modelMultiModelLiberadas.getData().length;
        modelTblLiberadas.setData( modelMultiModelLiberadas.getData().slice( paginationBarLiberadas.pagination.take *paginationBarLiberadas.pagination.index , 
                                          paginationBarLiberadas.pagination.take +( paginationBarLiberadas.pagination.index *paginationBarLiberadas.pagination.take)))

        //OR
        //Api Call with restriction 

        // var opts = {
        //     parameters: {
        //         take: paginationBarLiberadas.pagination.take,
        //         skip: paginationBarLiberadas.pagination.take * paginationBarLiberadas.pagination.index
        //     }
        // }

        // apiYour_API(opts);

    },
    handlePagination() {

        var maxIndex = (paginationBarLiberadas.pagination.count / paginationBarLiberadas.pagination.take);
        maxIndex = Math.ceil(maxIndex);

        if (paginationBarLiberadas.pagination.count <= paginationBarLiberadas.pagination.take) maxIndex = 1;

        toolPaginationFirst2.setEnabled(true);
        toolPaginationPrev2.setEnabled(true);
        toolPaginationNext2.setEnabled(true);
        toolPaginationLast2.setEnabled(true);

        if (paginationBarLiberadas.pagination.index < 0) paginationBarLiberadas.pagination.index = 0;

        if (paginationBarLiberadas.pagination.index === 0) {
            toolPaginationFirst2.setEnabled(false);
            toolPaginationPrev2.setEnabled(false);
        }

        if ((paginationBarLiberadas.pagination.index + 1) >= maxIndex) {
            toolPaginationNext2.setEnabled(false);
            toolPaginationLast2.setEnabled(false);
        }

        toolPaginationPages2.destroyItems();

        var numItems = 0;
        var maxItems = paginationBarLiberadas.configuration.maxNumberOfButtons - 1;
        var startItem = Number.parseInt(paginationBarLiberadas.pagination.index - (maxItems / 2));

        if (startItem < 0) startItem = 0;

        for (i = startItem; i < maxIndex; i++) {
            if (numItems <= maxItems) toolPaginationPages2.addItem(new sap.m.SegmentedButtonItem({ text: i + 1, key: i }));
            numItems++;
        }

        toolPaginationPages2.setSelectedKey(paginationBarLiberadas.pagination.index);
        toolPaginationTitle2.setNumber((paginationBarLiberadas.pagination.index + 1) + "/" + maxIndex);

    }
}
