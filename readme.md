# React Audio Player Pro (XXkb gzip)

[![Build Status](https://travis-ci.org/webbestmaster/react-table-pro.svg?branch=master)](https://travis-ci.org/github/webbestmaster/react-table-pro)
[![GitHub license](https://img.shields.io/npm/l/react-table-pro)](https://github.com/webbestmaster/react-table-pro/blob/master/license)
[![npm version](https://img.shields.io/npm/v/react-table-pro.svg?style=flat)](https://www.npmjs.com/package/react-table-pro)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-table-pro)
[![GitHub stars](https://img.shields.io/github/stars/webbestmaster/react-table-pro?style=social&maxAge=2592000)](https://github.com/webbestmaster/react-table-pro/)


**[Live demo](http://webbestmaster.github.io/react-table-pro)**


## Install

```bash
npm i react-table-pro
```


### Typing Flow

Use `./flow-typed/react-table-pro.js`.


### Typing TypeScript

Use `./@types/index.d.ts`.


## Usage example

```javascript
// @flow
import React, {type Node} from 'react';
import {Table} from 'react-table-pro';
import reactTableProStyle from 'react-table-pro/dist/style.css';

import type {
    SortDirectionType,
    TableGetDataResultType,
    TableBodyCellType,
    TablePropsType,
    TableGetDataType,
    TableHeaderType,
    TableHeaderCellType,
    TableCellAlignType,
} from 'react-table-pro';

type ApiResultType = {
    // ApiResultType are equals for TableBodyCellType for example only
    // you can use your own structure api's data
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

    // you should catch api's error here :)

    return (
        fetch('https://5f9704ad11ab98001603b694.mockapi.io/user?' + query)
            // $FlowFixMe
            .then((data: Response): Promise<Array<ApiResultType>> => data.json())
    );
}

const tableHeader = {
    // title of table, string, required
    title: 'User list',
    // list of column descriptions, required
    columnList: [
        {
            // unique field name in ApiResultType, string, required
            id: 'id',

            // aling of content, type TableCellAlignType = left | center | right, required
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
    order: SortDirectionType, // string: 'asc' | 'desc'
    refreshTable: () => Promise<void> // you can save and call this function to refresh table
): Promise<TableGetDataResultType> {
    const dataList: Array<ApiResultType> = await getDataList(pageIndex, rowsPerPage, sortBy, order);

    return {
        // all elements number, number, required
        allElementsNumber: 50,
        // Array of table cell data, Array<TableBodyCellType>, required
        list: dataList,
    };
}

export function App(): Node {
    return (
        <Table
            // function to get data, type TableGetDataType, required
            getData={tableGetUserList}
            // table header data, type TableHeaderType, required
            header={tableHeader}
        />
    );
}
```
