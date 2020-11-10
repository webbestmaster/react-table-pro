// @flow

import React from 'react';

import type {SortDirectionType, TableCellAlignType} from '../../table-type';
import {classNames} from '../../../lib/css';

import tableHeaderCellStyle from './table-head-cell.scss';
import {TableCellDirectionArrow} from './table-cell-direction-arrow/c-table-cell-direction-arrow';

type PropsType = {|
    +children: React$Node,
    +align: TableCellAlignType,
    +direction?: SortDirectionType,
    +handleSort?: (event: SyntheticEvent<HTMLElement>) => mixed,
|};

export function TableHeadCell(props: PropsType): React$Node {
    const {children, align, direction, handleSort} = props;

    const className = classNames(tableHeaderCellStyle.table_head_cell, {
        [tableHeaderCellStyle.table_head_cell__sortable]: Boolean(handleSort),
    });

    return (
        <th align={align} className={className} onClick={handleSort}>
            <div className={tableHeaderCellStyle.table_head_cell__content}>
                <TableCellDirectionArrow direction={direction}/>
                {children}
            </div>
        </th>
    );
}
