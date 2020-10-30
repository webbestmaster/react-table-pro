// @flow

import React, {type Node} from 'react';

import tableHeaderStyle from './table-header.scss';

type PropsType = {|
    +title: string,
|};

export function TableHeader(props: PropsType): Node {
    const {title} = props;

    return <h5 className={tableHeaderStyle.table_header}>{title}</h5>;
}
