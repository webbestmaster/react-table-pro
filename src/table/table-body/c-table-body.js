// @flow

import React, {Component, type Node} from 'react';
import TableBodyMaterialUi from '@material-ui/core/TableBody/TableBody';
import TableRowMaterialUi from '@material-ui/core/TableRow/TableRow';
import TableCellMaterialUi from '@material-ui/core/TableCell/TableCell';

import {isBoolean} from '../../lib/is';
import {CheckMark} from '../ui/check-mark/c-check-mark';
import type {TableBodyCellType, TableBodyType, TableHeaderCellType, TableHeaderType} from '../table-type';

type PropsType = {|
    +header: TableHeaderType,
    +table: TableBodyType,
|};

type StateType = null;

export class TableBody extends Component<PropsType, StateType> {
    getCellValue(headerCell: TableHeaderCellType, row: TableBodyCellType): Node {
        const cellName = headerCell.id;

        const cellValue = row[cellName];

        if (isBoolean(cellValue)) {
            return <CheckMark isChecked={cellValue}/>;
        }

        return cellValue;
    }

    renderCell(headerCell: TableHeaderCellType, row: TableBodyCellType): Node {
        const cellName = headerCell.id;
        const cellValue = this.getCellValue(headerCell, row);

        return (
            <TableCellMaterialUi align={headerCell.align} key={cellName}>
                {cellValue}
            </TableCellMaterialUi>
        );
    }

    renderRow(row: TableBodyCellType, index: number): Node {
        const {props} = this;
        const {header} = props;
        const {rowList} = header;

        return (
            <TableRowMaterialUi hover key={index} tabIndex={-1}>
                {rowList.map((headerCell: TableHeaderCellType): Node => this.renderCell(headerCell, row))}
            </TableRowMaterialUi>
        );
    }

    render(): Node {
        const {props} = this;
        const {table} = props;
        const {rowList} = table;

        return (
            <TableBodyMaterialUi key="table">
                {rowList.map((row: TableBodyCellType, index: number): Node => this.renderRow(row, index))}
            </TableBodyMaterialUi>
        );
    }
}
