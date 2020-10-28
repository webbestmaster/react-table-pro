// @flow

import React, {type Node} from 'react';

import checkMarkStyle from './check-mark.scss';
import {checkMarkChecked, checkMarkUnchecked} from './check-mark-const';

type PropsType = {|
    +isChecked: boolean,
|};

export function CheckMark(props: PropsType): Node {
    const {isChecked} = props;

    return (
        <svg
            className={checkMarkStyle.check_mark}
            height="24px"
            version="1.1"
            viewBox="0 0 24 24"
            width="24px"
            x="0px"
            xmlns="http://www.w3.org/2000/svg"
            y="0px"
        >
            {isChecked ? checkMarkChecked : checkMarkUnchecked}
        </svg>
    );
}
