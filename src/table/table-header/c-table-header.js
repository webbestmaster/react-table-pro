// @flow

import React from 'react';

// import tableHeaderStyle from './table-header.scss';

type PropsType = {|
    +title: React$Node,
|};

export function TableHeader(props: PropsType): React$Node {
    const {title} = props;

    return title;
}
