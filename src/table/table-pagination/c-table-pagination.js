// @flow

import React, {type Node, useCallback, useEffect, useState} from 'react';

type PropsType = {|
    +count: number,
    +onChangePageIndex: (pageIndex: number) => void,
    +onChangeRowsPerPage: (rowsPerPage: number) => void,
    +pageIndex: number,
    +rowsPerPage: number,
    +optionList: Array<number>,
|};

export function TablePagination(props: PropsType): Node {
    return 'TablePagination';
}
