// @flow

import React, {type Node, useCallback, useEffect, useState} from 'react';
import MaterialUiTable from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';

import {mixedToInt, typeConverter} from '../lib/type';
import {Spinner} from '../layout/spinner/c-spinner';

import {IsRender} from '../layout/is-render/c-is-render';

import enhancedTableStyle from './enhanced-table.scss';
import {EmptyTableBody} from './c-empty-table-body';
import {EnhancedTableHead} from './c-enhanced-table-head';
import {EnhancedTableToolbar} from './c-enhanced-table-toolbar';
import {EnhancedTableBody} from './c-enhanced-table-body';
import {getDefaultState, getSavedState, saveState} from './enhanced-table-helper';
import type {EnhancedTableBodyCellType, EnhancedTablePropsType, SortDirectionType} from './enhanced-table-type';
import {enhancedTableDirection, enhancedTableRowsPerPageOptions} from './enhanced-table-const';

type PropsType = EnhancedTablePropsType;

type StateType = {|
    +order: SortDirectionType,
    +orderBy: string,
    +rowsPerPage: number,
    +pageIndex: number,
    +list: Array<EnhancedTableBodyCellType>,
    +allElementsNumber: number,
    +isInProgress: boolean,
|};

export function Table(props: PropsType): Node {
    const {getData, header} = props;

    const state: StateType = {
        ...getDefaultState(props),
        ...getSavedState(props),
        pageIndex: 0,
        list: [],
        allElementsNumber: 0,
        isInProgress: false,
    };

    const [order, setOrder] = useState<SortDirectionType>(state.order);
    const [orderBy, setOrderBy] = useState<string>(state.orderBy);
    const [rowsPerPage, setRowsPerPage] = useState<number>(state.rowsPerPage);
    const [pageIndex, setPageIndex] = useState<number>(state.pageIndex);
    const [list, setList] = useState<Array<EnhancedTableBodyCellType>>(state.list);
    const [allElementsNumber, setAllElementsNumber] = useState<number>(state.allElementsNumber);
    const [isInProgress, setIsInProgress] = useState<boolean>(state.isInProgress);

    const fetchDataMemoized = useCallback(
        async function fetchData() {
            setIsInProgress(true);

            const data = await getData(pageIndex, rowsPerPage, orderBy, order, fetchData);

            setList(data.list);
            setAllElementsNumber(data.allElementsNumber);
            setIsInProgress(false);

            saveState({order, orderBy, rowsPerPage}, props);
        },
        [getData, order, orderBy, pageIndex, rowsPerPage, props]
    );

    useEffect(() => {
        fetchDataMemoized().catch(console.error);
    }, [pageIndex, rowsPerPage, orderBy, order, fetchDataMemoized]);

    function handleRequestSort(event: SyntheticEvent<HTMLElement>, newOrderBy: string) {
        const isAscOrder = orderBy === newOrderBy && order === enhancedTableDirection.desc;
        const newOrder = isAscOrder ? enhancedTableDirection.asc : enhancedTableDirection.desc;

        setOrder(newOrder);
        setOrderBy(newOrderBy);
    }

    function handleChangePage(event: SyntheticEvent<HTMLElement> | null, newPageIndex: number) {
        setPageIndex(newPageIndex);
    }

    function handleChangeRowsPerPage(event: SyntheticEvent<HTMLElement> | null) {
        if (event === null) {
            return;
        }

        const {value}: {value?: mixed} = typeConverter<{value?: mixed}>(event.target);

        setRowsPerPage(mixedToInt(value, 0));
    }

    const isListHasItem = list.length > 0;

    return (
        <div className={enhancedTableStyle.table_wrapper}>
            <EnhancedTableToolbar header={header.header}/>
            <Spinner isShow={isInProgress} position="absolute" wrapperColor="rgba(255, 255, 255, 0.5)"/>
            <IsRender isRender={!isListHasItem}>
                <MaterialUiTable key="table-no-data">
                    <EnhancedTableHead
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                        rowList={header.rowList}
                    />
                    <EmptyTableBody colSpan={header.rowList.length} isInProgress={isInProgress}/>
                </MaterialUiTable>
                <TablePagination
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    component="div"
                    count={allElementsNumber}
                    key="table-pagination-no-data"
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={pageIndex}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={enhancedTableRowsPerPageOptions}
                />
            </IsRender>
            <IsRender isRender={isListHasItem}>
                <MaterialUiTable key="table">
                    <EnhancedTableHead
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                        rowList={header.rowList}
                    />
                    <EnhancedTableBody header={header} table={{rowList: list}}/>
                </MaterialUiTable>
                <TablePagination
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    component="div"
                    count={allElementsNumber}
                    key="table-pagination"
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={pageIndex}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={enhancedTableRowsPerPageOptions}
                />
            </IsRender>
        </div>
    );
}
