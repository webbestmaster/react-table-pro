// @flow

import React, {type Node} from 'react';

export function getCountString(pageIndex: number, rowsPerPage: number, count: number): string {
    const beginPageNumber = pageIndex * rowsPerPage + 1;
    const endPageNumber = beginPageNumber + rowsPerPage - 1;

    return `${beginPageNumber}-${endPageNumber} / ${count}`;
}

export function renderOption(value: number): Node {
    return (
        <option key={value} value={value}>
            {value}
        </option>
    );
}
