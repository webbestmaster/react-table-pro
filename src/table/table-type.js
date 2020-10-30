// @flow

import {type Node} from 'react';

export type SortDirectionType = 'asc' | 'desc';

export type TableSavedStateType = {|
    +order: SortDirectionType,
    +orderBy: string,
    +rowsPerPage: number,
|};

export type TableCellAlignType = 'left' | 'center' | 'right';

export type TableHeaderCellType = {|
    +id: string,
    +label: string,
    +align: TableCellAlignType,
    +hasSort: boolean,
|};

export type TableHeaderType = {|
    +title: string,
    +columnList: Array<TableHeaderCellType>,
|};

export type TableBodyCellType = {
    +[key: string]: string | number | boolean | Node,
};

export type TableBodyType = {|
    +rowList: Array<TableBodyCellType>,
|};

export type OnRequestSortCallBackType = (rowId: string) => mixed;

export type TableGetDataResultType = {|
    +list: Array<TableBodyCellType>,
    +count: number,
|};

export type TableGetDataType = (
    pageIndex: number,
    rowsPerPage: number,
    orderBy: string,
    order: SortDirectionType,
    refreshTable: () => Promise<void>,
) => Promise<TableGetDataResultType>;

export type TablePropsType = {|
    +getData: TableGetDataType,
    +header: TableHeaderType,
|};
