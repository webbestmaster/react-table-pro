// @flow

/* global fetch */

import React, {type Node} from 'react';

import {Table} from '../../../../src/table';

import type {
    SortDirectionType,
    TableGetDataResultType,
    TableBodyCellType,
    TablePropsType,
    TableGetDataType,
    TableHeaderType,
    TableHeaderCellType,
    TableCellAlignType,
} from '../../../../src/table';

import appStyle from './app.scss';

type ApiResultType = {
    // equals for TableBodyCellType
    +[key: string]: string | number | boolean | Node,
};

// your own function to fetch data
export function getDataList(
    pageIndex: number, // page index started from 0
    rowsPerPage: number, // number of items in response
    sortBy: string, // id of field
    order: SortDirectionType // asc or desc
): Promise<Array<ApiResultType>> {
    const query = `page=${pageIndex + 1}&limit=${rowsPerPage}&sortBy=${sortBy}&order=${order}`;

    return (
        fetch('https://5f9704ad11ab98001603b694.mockapi.io/user?' + query)
            // $FlowFixMe
            .then((data: Response): Promise<Array<ApiResultType>> => data.json())
    );
}

const tableHeader = {
    // title of table, string, required
    title: 'User list',
    // list of columns, required
    columnList: [
        {
            // unique field name in ApiResultType, string, required
            id: 'id',

            // aling of content, type TableCellAlignType = inherit | left | center | right | justify, required
            align: 'left',

            // column's name, string, required
            label: 'Id',

            // can or can't sort by this field id, boolean, required
            hasSort: false,
        },
        {id: 'isAdmin', align: 'center', label: 'Is admin', hasSort: true},
        {id: 'login', align: 'right', label: 'Login', hasSort: true},
    ],
};

async function tableGetUserList(
    pageIndex: number, // page index started from 0
    rowsPerPage: number, // number of items in response
    sortBy: string, // id of field
    order: SortDirectionType, // asc or desc
    refreshTable: () => Promise<void> // you can save and call this function to refresh table
): Promise<TableGetDataResultType> {
    const dataList: Array<ApiResultType> = await getDataList(pageIndex, rowsPerPage, sortBy, order);

    return {
        // all elements number, number, required
        allElementsNumber: 50,
        // Array of table cell data, Array<ApiResultType>, required
        list: dataList,
    };
}

export function App(): Node {
    return (
        <div className={appStyle.app}>
            <Table
                // function to get data, type TableGetDataType, required
                getData={tableGetUserList}
                // table header data, type TableHeaderType, required
                header={tableHeader}
            />
        </div>
    );
}
