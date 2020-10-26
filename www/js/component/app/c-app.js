// @flow

/* global fetch */

import React, {type Node} from 'react';

import {
    Table,
    type SortDirectionType,
    type EnhancedTableGetDataResultType,
    type EnhancedTableBodyCellType,
} from '../../../../src/table';

import appStyle from './app.scss';

export function getData(
    pageIndex: number, // page index started from 0
    rowsPerPage: number, // number of items in response
    sortBy: string, // id of field
    order: SortDirectionType // asc or desc
): Promise<Array<EnhancedTableBodyCellType>> {
    const query = `page=${pageIndex + 1}&limit=${rowsPerPage}&sortBy=${sortBy}&order=${order}`;

    return (
        fetch('https://5f9704ad11ab98001603b694.mockapi.io/user?' + query)
            // $FlowFixMe
            .then((data: mixed): Promise<Array<EnhancedTableBodyCellType>> => data.json())
    );
}

export function App(): Node {
    const enhancedTableHeader = {
        header: 'User list',
        rowList: [
            {id: 'id', align: 'left', label: 'Id', hasSort: false},
            {id: 'role', align: 'left', label: 'Role', hasSort: true},
            {id: 'login', align: 'left', label: 'Login', hasSort: true},
            {id: 'rating', align: 'left', label: 'Rating', hasSort: true},
        ],
    };

    async function enhancedTableGetUserList(
        pageIndex: number,
        rowsPerPage: number,
        orderBy: string,
        order: SortDirectionType,
        refreshTable: () => Promise<mixed> // save and call this function to refresh table
    ): Promise<EnhancedTableGetDataResultType> {
        const dataList: Array<EnhancedTableBodyCellType> = await getData(pageIndex, rowsPerPage, orderBy, order);

        return {
            allElementsNumber: 50,
            list: dataList,
        };
    }

    return (
        <div className={appStyle.app}>
            <Table getData={enhancedTableGetUserList} header={enhancedTableHeader}/>
        </div>
    );
}
