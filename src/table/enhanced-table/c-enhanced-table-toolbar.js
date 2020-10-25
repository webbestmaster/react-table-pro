// @flow

import React, {type Node} from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box';

type PropsType = {|
    +header: string,
|};

export function EnhancedTableToolbar(props: PropsType): Node {
    const {header} = props;

    return (
        <Box p={2}>
            <Typography variant="h5">{header}</Typography>
        </Box>
    );
}
