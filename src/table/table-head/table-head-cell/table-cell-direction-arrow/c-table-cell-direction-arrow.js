// @flow

import React from 'react';

import type {SortDirectionType} from '../../../table-type';
import {sortDirection} from '../../../table-const';

import tableCellDirectionArrowStyle from './table-cell-direction-arrow.scss';

type PropsType = {
    +direction?: SortDirectionType,
};

export function TableCellDirectionArrow(props: PropsType): React$Node {
    const {direction} = props;

    if (!direction) {
        return null;
    }

    const className
        = direction === sortDirection.asc
            ? tableCellDirectionArrowStyle.table_cell_direction_arrow__asc
            : tableCellDirectionArrowStyle.table_cell_direction_arrow__desc;

    return (
        <svg className={className} viewBox="0 0 24 24">
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="#777"/>
        </svg>
    );
}
