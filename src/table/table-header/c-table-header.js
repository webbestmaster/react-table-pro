// @flow

import React, {type Node} from 'react';
import TypographyMaterialUi from '@material-ui/core/Typography/Typography';
import BoxMaterialUi from '@material-ui/core/Box';

type PropsType = {|
    +header: string,
|};

export function TableHeader(props: PropsType): Node {
    const {header} = props;

    return (
        <BoxMaterialUi p={2}>
            <TypographyMaterialUi variant="h5">{header}</TypographyMaterialUi>
        </BoxMaterialUi>
    );
}
