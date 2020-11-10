// @flow

import React from 'react';

import tableBodyStyle from '../table-body/table-body.scss';

import emptyTableBodyStyle from './empty-table-body.scss';

type PropsType = {|
    +colSpan: number,
    +isInProgress: boolean,
|};

export function EmptyTableBody(props: PropsType): React$Node {
    const {colSpan, isInProgress} = props;

    const contentClassName = isInProgress
        ? emptyTableBodyStyle.empty_table_body_cell_content__in_progress
        : emptyTableBodyStyle.empty_table_body_cell_content;

    return (
        <tbody>
            <tr className={tableBodyStyle.table_body_row}>
                <td colSpan={colSpan}>
                    <p className={contentClassName}>&empty;</p>
                </td>
            </tr>
        </tbody>
    );
}
