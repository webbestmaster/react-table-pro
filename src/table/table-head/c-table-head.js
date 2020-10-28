// @flow

import React, {Component, type Node} from 'react';
import TableHeadMaterialUi from '@material-ui/core/TableHead';
import TableRowMaterialUi from '@material-ui/core/TableRow';
import TableCellMaterialUi from '@material-ui/core/TableCell';
import TableSortLabelMaterialUi from '@material-ui/core/TableSortLabel';

import type {OnRequestSortCallBackType, SortDirectionType, TableHeaderCellType} from '../table-type';

import tableHeadStyle from './table-head.scss';

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

    renderSortLabel(column: TableHeaderCellType): Node {
        const {props} = this;
        const {order, orderBy} = props;
        const {id, label, hasSort} = column;

        if (hasSort === false) {
            return <span>{label}</span>;
        }

        const handleSort = this.createSortHandler(id);

        if (orderBy === id) {
            return (
                <TableSortLabelMaterialUi
                    active
                    className={tableHeadStyle.sort_label}
                    direction={order}
                    onClick={handleSort}
                >
                    {label}
                </TableSortLabelMaterialUi>
            );
        }

        return (
            <button className={tableHeadStyle.sort_label} onClick={handleSort} type="button">
                {label}
            </button>
        );
    }

    renderCell(column: TableHeaderCellType): Node {
        const {id, align} = column;

        return (
            <TableCellMaterialUi align={align} key={id}>
                {this.renderSortLabel(column)}
            </TableCellMaterialUi>
        );
    }

    render(): Node {
        const {props} = this;
        const {columnList} = props;

        return (
            <TableHeadMaterialUi>
                <TableRowMaterialUi>
                    {columnList.map((column: TableHeaderCellType): Node => this.renderCell(column))}
                </TableRowMaterialUi>
            </TableHeadMaterialUi>
        );
    }
}
