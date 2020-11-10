// @flow

import React from 'react';

import {classNames} from '../../lib/css';

import tablePaginationStyle from './table-pagination.scss';
import {getCountString, renderOption} from './table-pagination-helper';

type PropsType = {|
    +count: number,
    +onChangePageIndex: (pageIndex: number) => void,
    +onChangeRowsPerPage: (rowsPerPage: number) => void,
    +pageIndex: number,
    +rowsPerPage: number,
    +optionList: Array<number>,
|};

export function TablePagination(props: PropsType): React$Node {
    const {count, onChangePageIndex, onChangeRowsPerPage, pageIndex, rowsPerPage, optionList} = props;

    const isPreviousButtonDisabled = pageIndex <= 0;
    const isNextButtonDisabled = pageIndex + 1 >= count / rowsPerPage;

    const previousButtonClassName = classNames(tablePaginationStyle.table_pagination_button_previous, {
        [tablePaginationStyle.table_pagination_button_disabled]: isPreviousButtonDisabled,
    });

    const nextButtonClassName = classNames(tablePaginationStyle.table_pagination_button_next, {
        [tablePaginationStyle.table_pagination_button_disabled]: isNextButtonDisabled,
    });

    function handlePreviousButton() {
        onChangePageIndex(pageIndex - 1);
    }

    function handleNextButton() {
        onChangePageIndex(pageIndex + 1);
    }

    function handleChangeRowsPerPage(event: SyntheticEvent<HTMLSelectElement>) {
        const newRowsPerPage = Number.parseInt(event.currentTarget.value, 10);

        onChangePageIndex(0);
        onChangeRowsPerPage(newRowsPerPage);
    }

    /* eslint-disable jsx-a11y/no-onchange */
    return (
        <div className={tablePaginationStyle.table_pagination}>
            <select
                className={tablePaginationStyle.table_pagination__select}
                defaultValue={rowsPerPage}
                onChange={handleChangeRowsPerPage}
            >
                {optionList.map(renderOption)}
            </select>
            <p className={tablePaginationStyle.table_pagination__count}>
                {getCountString(pageIndex, rowsPerPage, count)}
            </p>
            <button className={previousButtonClassName} onClick={handlePreviousButton} type="button">
                &#x21e6;
            </button>
            <button className={nextButtonClassName} onClick={handleNextButton} type="button">
                &#x21e8;
            </button>
        </div>
    );
}
