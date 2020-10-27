// @flow

import React, {type Node} from 'react';

import tableStyle from '../table.scss';

type PropsType = {|
    +isChecked: boolean,
|};

export function EnhancedTableCheckbox(props: PropsType): Node {
    const {isChecked} = props;

    const path = isChecked
        ? <path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" fill="#0c0"/>
        : <path d="M19,13H5v-2h14V13z" fill="#999"/>

    ;

    return (
        <svg
            className={tableStyle.table_checkbox}
            height="24px"
            version="1.1"
            viewBox="0 0 24 24"
            width="24px"
            x="0px"
            xmlns="http://www.w3.org/2000/svg"
            y="0px"
        >
            {path}
        </svg>
    );
}
