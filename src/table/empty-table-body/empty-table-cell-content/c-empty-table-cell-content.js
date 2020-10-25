// @flow

import React, {type Node} from 'react';
import Typography from '@material-ui/core/Typography';

import emptyTableCellContentStyle from './empty-table-cell-content.scss';

export function EmptyTableCellContent(): Node {
    return (
        <Typography align="center" className={emptyTableCellContentStyle.empty_table_body_cell_content} variant="h6">
            [ Empty ]
        </Typography>
    );
}
