// @flow

import React, {type Node} from 'react';
import TypographyMaterialUi from '@material-ui/core/Typography/Typography';
import BoxMaterialUi from '@material-ui/core/Box';

type PropsType = {|
    +title: string,
|};

export function TableHeader(props: PropsType): Node {
    const {title} = props;

    return (
        <BoxMaterialUi p={2}>
            <TypographyMaterialUi variant="h5">{title}</TypographyMaterialUi>
        </BoxMaterialUi>
    );
}
