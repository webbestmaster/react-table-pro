// @flow

import React, {Component, type Node} from 'react';

import type {OnRequestSortCallBackType, SortDirectionType, TableHeaderCellType} from '../table-type';

import {TableHeadCell} from './table-head-cell/c-table-head-cell';

type PropsType = {|
    +onRequestSort: OnRequestSortCallBackType,
    +order: SortDirectionType,
    +orderBy: string,
    +columnList: Array<TableHeaderCellType>,
|};

type StateType = null;

export class TableHead extends Component<PropsType, StateType> {
    createSortHandler(columnId: string): (event: SyntheticEvent<HTMLElement>) => mixed {
        return (event: SyntheticEvent<HTMLElement>) => {
            const {props} = this;
            const {onRequestSort} = props;

            onRequestSort(event, columnId);
        };
    }

    renderCell(column: TableHeaderCellType): Node {
        const {props} = this;
        const {order, orderBy} = props;
        const {id, label, hasSort, align} = column;

        if (hasSort === false) {
            return (
                <TableHeadCell align={align} key={id + '-no-sort'}>
                    {label}
                </TableHeadCell>
            );
        }

        const handleSort = this.createSortHandler(id);

        if (orderBy === id) {
            return (
                <TableHeadCell align={align} direction={order} handleSort={handleSort} key={id + '-sort-active'}>
                    {label}
                </TableHeadCell>
            );
        }

        return (
            <TableHeadCell align={align} handleSort={handleSort} key={id + '-sort'}>
                {label}
            </TableHeadCell>
        );
    }

    render(): Node {
        const {props} = this;
        const {columnList} = props;

        return (
            <thead>
                <tr>{columnList.map((column: TableHeaderCellType): Node => this.renderCell(column))}</tr>
            </thead>
        );
    }
}
