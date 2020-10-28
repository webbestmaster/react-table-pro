// @flow

import React, {type Node} from 'react';
import TableBodyMaterialUi from '@material-ui/core/TableBody';
import TableRowMaterialUi from '@material-ui/core/TableRow';
import TableCellMaterialUi from '@material-ui/core/TableCell';

import {IsRender} from '../../layout/is-render/c-is-render';

import emptyTableBodyStyle from './empty-table-body.scss';

type PropsType = {|
    +colSpan: number,
    +isInProgress: boolean,
|};

export function EmptyTableBody(props: PropsType): Node {
    const {colSpan, isInProgress} = props;

    /* eslint-disable react/jsx-max-depth */
    return (
        <TableBodyMaterialUi>
            <TableRowMaterialUi>
                <TableCellMaterialUi className={emptyTableBodyStyle.empty_table_cell} colSpan={colSpan}>
                    <IsRender isRender={!isInProgress}>
                        <p className={emptyTableBodyStyle.empty_table_body_cell_content}>&empty;</p>
                    </IsRender>
                </TableCellMaterialUi>
            </TableRowMaterialUi>
        </TableBodyMaterialUi>
    );
    /* eslint-enable react/jsx-max-depth */
}
