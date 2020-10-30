// @flow

import React, {Component, type Node} from 'react';

import {isBoolean} from '../../lib/is';
import {CheckMark} from '../ui/check-mark/c-check-mark';
import type {TableBodyCellType, TableBodyType, TableHeaderCellType, TableHeaderType} from '../table-type';

import tableBodyStyle from './table-body.scss';

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
            <td align={headerCell.align} className={tableBodyStyle.table_body_cell} key={cellName}>
                {cellValue}
            </td>
        );
    }

    renderRow(row: TableBodyCellType, index: number): Node {
        const {props} = this;
        const {header} = props;
        const {columnList} = header;

        return (
            <tr key={index}>
                {columnList.map((headerCell: TableHeaderCellType): Node => this.renderCell(headerCell, row))}
            </tr>
        );
    }

    render(): Node {
        const {props} = this;
        const {table} = props;
        const {rowList} = table;

        return (
            <tbody>{rowList.map((row: TableBodyCellType, index: number): Node => this.renderRow(row, index))}</tbody>
        );
    }
}
