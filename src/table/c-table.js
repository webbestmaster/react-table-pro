// @flow

import React, {useCallback, useEffect, useState} from 'react';

import {Spinner} from '../layout/spinner/c-spinner';
import {IsRender} from '../layout/is-render/c-is-render';

import tableStyle from './table.scss';
import {EmptyTableBody} from './empty-table-body/c-empty-table-body';
import {TableHead} from './table-head/c-table-head';
import {TableHeader} from './table-header/c-table-header';
import {TableBody} from './table-body/c-table-body';
import {getDefaultState, getSavedState, saveState} from './table-helper';
import type {SortDirectionType, TableBodyCellType, TablePropsType} from './table-type';
import {sortDirection, tableRowsPerPageOptions} from './table-const';
import {TablePagination} from './table-pagination/c-table-pagination';

type PropsType = TablePropsType;

type StateType = {|
    +order: SortDirectionType,
    +orderBy: string,
    +rowsPerPage: number,
    +pageIndex: number,
    +list: Array<TableBodyCellType>,
    +count: number,
    +isInProgress: boolean,
|};

export function Table(props: PropsType): React$Node {
    const {getData, header} = props;
    const {columnList, title} = header;

    const state: StateType = {
        ...getDefaultState(props),
        ...getSavedState(props),
        pageIndex: 0,
        list: [],
        count: 0,
        isInProgress: false,
    };

    const [order, setOrder] = useState<SortDirectionType>(state.order);
    const [orderBy, setOrderBy] = useState<string>(state.orderBy);
    const [rowsPerPage, setRowsPerPage] = useState<number>(state.rowsPerPage);
    const [pageIndex, setPageIndex] = useState<number>(state.pageIndex);
    const [list, setList] = useState<Array<TableBodyCellType>>(state.list);
    const [count, setCount] = useState<number>(state.count);
    const [isInProgress, setIsInProgress] = useState<boolean>(state.isInProgress);

    const fetchDataMemoized = useCallback(
        async function fetchData() {
            setIsInProgress(true);

            const data = await getData(pageIndex, rowsPerPage, orderBy, order, fetchData);

            setList(data.list);
            setCount(data.count);
            setIsInProgress(false);

            saveState({order, orderBy, rowsPerPage}, props);
        },
        [getData, order, orderBy, pageIndex, rowsPerPage, props]
    );

    useEffect(() => {
        fetchDataMemoized().catch(console.error);
    }, [pageIndex, rowsPerPage, orderBy, order, fetchDataMemoized]);

    function handleRequestSort(newOrderBy: string) {
        const {asc, desc} = sortDirection;
        const isAscOrder = orderBy === newOrderBy && order === desc;
        const newOrder = isAscOrder ? asc : desc;

        setOrder(newOrder);
        setOrderBy(newOrderBy);
    }

    function handleChangePage(newPageIndex: number) {
        setPageIndex(newPageIndex);
    }

    function handleChangeRowsPerPage(newRowsPerPage: number) {
        setRowsPerPage(newRowsPerPage);
    }

    const isListHasItem = list.length > 0;

    return (
        <div className={tableStyle.table_wrapper}>
            <TableHeader title={title}/>
            <Spinner isShow={isInProgress} position="absolute" wrapperColor="rgba(255, 255, 255, 0.5)"/>
            <IsRender isRender={!isListHasItem}>
                <table className={tableStyle.table} key="table-no-data">
                    <TableHead
                        columnList={columnList}
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                    />
                    <EmptyTableBody colSpan={columnList.length} isInProgress={isInProgress}/>
                </table>
                <TablePagination
                    count={count}
                    onChangePageIndex={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    optionList={tableRowsPerPageOptions}
                    pageIndex={pageIndex}
                    rowsPerPage={rowsPerPage}
                />
            </IsRender>
            <IsRender isRender={isListHasItem}>
                <table className={tableStyle.table} key="table">
                    <TableHead
                        columnList={columnList}
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                    />
                    <TableBody header={header} table={{rowList: list}}/>
                </table>
                <TablePagination
                    count={count}
                    onChangePageIndex={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    optionList={tableRowsPerPageOptions}
                    pageIndex={pageIndex}
                    rowsPerPage={rowsPerPage}
                />
            </IsRender>
        </div>
    );
}
