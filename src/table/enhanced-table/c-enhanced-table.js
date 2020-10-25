// @flow

import React, {Component, type Node} from 'react';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import {EmptyTableBody} from '../empty-table-body/c-empty-table-body';
import {mixedToInt, typeConverter} from '../../lib/type';
import {Spinner} from '../../layout/spinner/c-spinner';

import enhancedTableStyle from './enhanced-table.scss';
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

export class EnhancedTable extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {
            ...getDefaultState(props),
            ...getSavedState(props),
            pageIndex: 0,
            list: [],
            allElementsNumber: 0,
            isInProgress: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({isInProgress: true});

        const {state, props} = this;
        const {pageIndex, rowsPerPage, orderBy, order} = state;

        const {list, allElementsNumber} = await props.getData(pageIndex, rowsPerPage, orderBy, order, this.fetchData);

        this.setState({list, allElementsNumber, isInProgress: false});

        saveState({order, orderBy, rowsPerPage}, props);
    };

    handleRequestSort = (event: SyntheticEvent<HTMLElement>, orderBy: string) => {
        const {orderBy: oldOrderBy, order: oldOrder} = this.state;
        const order
            = oldOrderBy === orderBy && oldOrder === enhancedTableDirection.desc
                ? enhancedTableDirection.asc
                : enhancedTableDirection.desc;

        this.setState({order, orderBy}, this.fetchData);
    };

    handleChangePage = (event: SyntheticEvent<HTMLElement> | null, pageIndex: number) => {
        this.setState({pageIndex}, this.fetchData);
    };

    handleChangeRowsPerPage = (event: SyntheticEvent<HTMLElement> | null) => {
        if (event === null) {
            return;
        }

        const {value}: {value?: mixed} = typeConverter<{value?: mixed}>(event.target);

        this.setState({rowsPerPage: mixedToInt(value, 0)}, this.fetchData);
    };

    renderNoData(): Node {
        const {props, state} = this;
        const {header} = props;
        const {order, orderBy, rowsPerPage, pageIndex, allElementsNumber, isInProgress} = state;

        return [
            <Table key="table">
                <EnhancedTableHead
                    onRequestSort={this.handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                    rowList={header.rowList}
                />
                <EmptyTableBody colSpan={header.rowList.length} isInProgress={isInProgress}/>
            </Table>,
            <TablePagination
                backIconButtonProps={{'aria-label': 'Previous Page'}}
                component="div"
                count={allElementsNumber}
                key="table-pagination"
                nextIconButtonProps={{'aria-label': 'Next Page'}}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                page={pageIndex}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={enhancedTableRowsPerPageOptions}
            />,
        ];
    }

    renderData(): Node {
        const {props, state} = this;
        const {header} = props;
        const {order, orderBy, rowsPerPage, pageIndex, list, allElementsNumber, isInProgress} = state;

        return [
            <Table key="table">
                <EnhancedTableHead
                    onRequestSort={this.handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                    rowList={header.rowList}
                />
                <EnhancedTableBody header={header} isInProgress={isInProgress} table={{rowList: list}}/>
            </Table>,
            <TablePagination
                backIconButtonProps={{'aria-label': 'Previous Page'}}
                component="div"
                count={allElementsNumber}
                key="table-pagination"
                nextIconButtonProps={{'aria-label': 'Next Page'}}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                page={pageIndex}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={enhancedTableRowsPerPageOptions}
            />,
        ];
    }

    renderContent(): Node {
        const {state} = this;
        const {list, isInProgress} = state;

        return (
            <div className={enhancedTableStyle.table_content}>
                <Spinner isShow={isInProgress} position="absolute" wrapperColor="rgba(255, 255, 255, 0.5)"/>
                {list.length === 0 ? this.renderNoData() : this.renderData()}
            </div>
        );
    }

    render(): Node {
        const {props} = this;
        const {header} = props;
        const headerText = header.header;

        return (
            <div className={enhancedTableStyle.table_wrapper}>
                <Paper>
                    <EnhancedTableToolbar header={headerText}/>
                    {this.renderContent()}
                </Paper>
            </div>
        );
    }
}
