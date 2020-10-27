// @flow

import React, {Component, type Node} from 'react';
import TableHeadMaterialUi from '@material-ui/core/TableHead';
import TableRowMaterialUi from '@material-ui/core/TableRow';
import TableCellMaterialUi from '@material-ui/core/TableCell';
import TableSortLabelMaterialUi from '@material-ui/core/TableSortLabel';

import type {TableHeaderCellType, OnRequestSortCallBackType, SortDirectionType} from './table-type';
import tableStyle from './table.scss';

type PropsType = {|
    +onRequestSort: OnRequestSortCallBackType,
    +order: SortDirectionType,
    +orderBy: string,
    +rowList: Array<TableHeaderCellType>,
|};

type StateType = null;

export class TableHead extends Component<PropsType, StateType> {
    createSortHandler(rowId: string): (event: SyntheticEvent<HTMLElement>) => mixed {
        return (event: SyntheticEvent<HTMLElement>) => {
            const {props} = this;
            const {onRequestSort} = props;

            onRequestSort(event, rowId);
        };
    }

    renderSortLabel(row: TableHeaderCellType): Node {
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
                <TableSortLabelMaterialUi
                    active
                    className={tableStyle.sort_label}
                    direction={order}
                    onClick={handleSort}
                >
                    {content}
                </TableSortLabelMaterialUi>
            );
        }

        return (
            <button className={tableStyle.sort_label} onClick={handleSort} type="button">
                {content}
            </button>
        );
    }

    renderCell(row: TableHeaderCellType): Node {
        return (
            <TableCellMaterialUi align={row.align} key={row.id}>
                {this.renderSortLabel(row)}
            </TableCellMaterialUi>
        );
    }

    render(): Node {
        const {props} = this;
        const {rowList} = props;

        return (
            <TableHeadMaterialUi>
                <TableRowMaterialUi>
                    {rowList.map((row: TableHeaderCellType): Node => this.renderCell(row))}
                </TableRowMaterialUi>
            </TableHeadMaterialUi>
        );
    }
}
