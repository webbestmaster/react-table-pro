// @flow

import React, {type Node, useCallback, useEffect, useState} from 'react';
import TableMaterialUi from '@material-ui/core/Table';
import TablePaginationMaterialUi from '@material-ui/core/TablePagination';

import {mixedToInt, typeConverter} from '../lib/type';
import {Spinner} from '../layout/spinner/c-spinner';
import {IsRender} from '../layout/is-render/c-is-render';

import tableStyle from './table.scss';
import {EmptyTableBody} from './c-empty-table-body';
import {TableHead} from './c-table-head';
import {TableToolbar} from './c-table-toolbar';
import {TableBody} from './c-table-body';
import {getDefaultState, getSavedState, saveState} from './table-helper';
import type {TableBodyCellType, TablePropsType, SortDirectionType} from './table-type';
import {tableDirection, tableRowsPerPageOptions} from './table-const';

type PropsType = TablePropsType;

type StateType = {|
    +order: SortDirectionType,
    +orderBy: string,
    +rowsPerPage: number,
    +pageIndex: number,
    +list: Array<TableBodyCellType>,
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
    const [list, setList] = useState<Array<TableBodyCellType>>(state.list);
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
        const isAscOrder = orderBy === newOrderBy && order === tableDirection.desc;
        const newOrder = isAscOrder ? tableDirection.asc : tableDirection.desc;

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
        <div className={tableStyle.table_wrapper}>
            <TableToolbar header={header.header}/>
            <Spinner isShow={isInProgress} position="absolute" wrapperColor="rgba(255, 255, 255, 0.5)"/>
            <IsRender isRender={!isListHasItem}>
                <TableMaterialUi key="table-no-data">
                    <TableHead
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                        rowList={header.rowList}
                    />
                    <EmptyTableBody colSpan={header.rowList.length} isInProgress={isInProgress}/>
                </TableMaterialUi>
                <TablePaginationMaterialUi
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    component="div"
                    count={allElementsNumber}
                    key="table-pagination-no-data"
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={pageIndex}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={tableRowsPerPageOptions}
                />
            </IsRender>
            <IsRender isRender={isListHasItem}>
                <TableMaterialUi key="table">
                    <TableHead
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                        rowList={header.rowList}
                    />
                    <TableBody header={header} table={{rowList: list}}/>
                </TableMaterialUi>
                <TablePaginationMaterialUi
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    component="div"
                    count={allElementsNumber}
                    key="table-pagination"
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={pageIndex}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={tableRowsPerPageOptions}
                />
            </IsRender>
        </div>
    );
}
