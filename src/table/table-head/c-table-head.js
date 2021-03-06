// @flow

import React, {Component} from 'react';

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
    createSortHandler(columnId: string): () => void {
        return () => {
            const {props} = this;
            const {onRequestSort} = props;

            onRequestSort(columnId);
        };
    }

    renderCell(column: TableHeaderCellType): React$Node {
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

    render(): React$Node {
        const {props} = this;
        const {columnList} = props;

        return (
            <thead>
                <tr>{columnList.map((column: TableHeaderCellType): React$Node => this.renderCell(column))}</tr>
            </thead>
        );
    }
}
