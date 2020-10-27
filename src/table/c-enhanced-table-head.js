// @flow

import React, {Component, type Node} from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import type {EnhancedTableHeaderCellType, OnRequestSortCallBackType, SortDirectionType} from './enhanced-table-type';
import tableStyle from './table.scss';

type PropsType = {|
    +onRequestSort: OnRequestSortCallBackType,
    +order: SortDirectionType,
    +orderBy: string,
    +rowList: Array<EnhancedTableHeaderCellType>,
|};

type StateType = null;

export class EnhancedTableHead extends Component<PropsType, StateType> {
    createSortHandler(rowId: string): (event: SyntheticEvent<HTMLElement>) => mixed {
        return (event: SyntheticEvent<HTMLElement>) => {
            const {props} = this;
            const {onRequestSort} = props;

            onRequestSort(event, rowId);
        };
    }

    renderSortLabel(row: EnhancedTableHeaderCellType): Node {
        const {props} = this;
        const {order, orderBy} = props;
        const rowId = row.id;
        const content = row.label;

        if (row.hasSort === false) {
            return <span>{content}</span>;
        }

        const handleSort = this.createSortHandler(rowId);

        if (orderBy === rowId) {
            return (
                <TableSortLabel active className={tableStyle.sort_label} direction={order} onClick={handleSort}>
                    {content}
                </TableSortLabel>
            );
        }

        return (
            <button className={tableStyle.sort_label} onClick={handleSort} type="button">
                {content}
            </button>
        );
    }

    renderCell(row: EnhancedTableHeaderCellType): Node {
        return (
            <TableCell align={row.align} key={row.id}>
                {this.renderSortLabel(row)}
            </TableCell>
        );
    }

    render(): Node {
        const {props} = this;
        const {rowList} = props;

        return (
            <TableHead>
                <TableRow>{rowList.map((row: EnhancedTableHeaderCellType): Node => this.renderCell(row))}</TableRow>
            </TableHead>
        );
    }
}
