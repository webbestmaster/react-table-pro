// @flow

import React, {type Node} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import emptyTableBodyStyle from './empty-table-body.scss';
import {EmptyTableCellContent} from './empty-table-cell-content/c-empty-table-cell-content';

type PropsType = {|
    +colSpan: number,
    +isInProgress: boolean,
|};

export function EmptyTableBody(props: PropsType): Node {
    const {colSpan, isInProgress} = props;

    return (
        <TableBody>
            <TableRow>
                <TableCell className={emptyTableBodyStyle.cell} colSpan={colSpan}>
                    {isInProgress ? null : <EmptyTableCellContent/>}
                </TableCell>
            </TableRow>
        </TableBody>
    );
}
