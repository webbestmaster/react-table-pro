// @flow

import React, {type Node} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

import {IsRender} from '../layout/is-render/c-is-render';

import tableStyle from './table.scss';

type PropsType = {|
    +colSpan: number,
    +isInProgress: boolean,
|};

export function EmptyTableBody(props: PropsType): Node {
    const {colSpan, isInProgress} = props;

    /* eslint-disable react/jsx-max-depth */
    return (
        <TableBody>
            <TableRow>
                <TableCell className={tableStyle.empty_table_cell} colSpan={colSpan}>
                    <IsRender isRender={!isInProgress}>
                        <Typography align="center" className={tableStyle.empty_table_body_cell_content} variant="h6">
                            [ Empty ]
                        </Typography>
                    </IsRender>
                </TableCell>
            </TableRow>
        </TableBody>
    );
    /* eslint-enable react/jsx-max-depth */
}
