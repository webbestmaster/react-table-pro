// @flow

/* global localStorage */

import {isNumber, isString} from '../lib/is';

import {defaultRowPerPage, sortDirection} from './table-const';
import type {TableHeaderCellType, TablePropsType, TableSavedStateType} from './table-type';

export function getDefaultState(props: TablePropsType): TableSavedStateType {
    return {
        order: sortDirection.asc,
        orderBy: props.header.rowList[0].id,
        rowsPerPage: defaultRowPerPage,
    };
}

function getTableKey(props: TablePropsType): string {
    const title = props.header.title;
    const columns = props.header.rowList.map((column: TableHeaderCellType): string => column.id).join(' | ');

    return `Table "${title}" - ${columns}`;
}

export function getSavedState(props: TablePropsType): TableSavedStateType {
    const tableKey = getTableKey(props);
    const {order, orderBy, rowsPerPage} = JSON.parse(localStorage.getItem(tableKey) || '{}');
    const {asc, desc} = sortDirection;

    return {
        order: order === desc ? desc : asc,
        orderBy: isString(orderBy) ? orderBy : props.header.rowList[0].id,
        rowsPerPage: isNumber(rowsPerPage) ? rowsPerPage : defaultRowPerPage,
    };
}

export function saveState(state: TableSavedStateType, props: TablePropsType): TableSavedStateType {
    const newState: TableSavedStateType = {
        order: state.order,
        orderBy: state.orderBy,
        rowsPerPage: state.rowsPerPage,
    };

    localStorage.setItem(getTableKey(props), JSON.stringify(newState));

    return newState;
}
