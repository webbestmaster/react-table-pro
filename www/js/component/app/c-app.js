// @flow

import React, {type Node} from 'react';

import {Table} from '../../../../src/table';

import appStyle from './app.scss';

export function App(): Node {
    const enhancedTableHeader = {
        header: 'User list',
        rowList: [
            {id: 'id', align: 'left', label: 'Id', hasSort: true},
            {id: 'role', align: 'left', label: 'Role', hasSort: true},
            {id: 'login', align: 'left', label: 'Login', hasSort: true},
            {id: 'registerDate', align: 'left', label: 'Register Date (UTC 0)', hasSort: true},
            {id: 'rating', align: 'left', label: 'Rating', hasSort: true},
        ],
    };

    async function enhancedTableGetUserList(
        pageIndex: number,
        rowsPerPage: number,
        orderBy: string,
        order: SortDirectionType,
        refreshTable: () => Promise<mixed>
    ): Promise<EnhancedTableGetDataResultType> {
        const list = await getUserList(pageIndex, rowsPerPage, orderBy, order);
        const fullListSize = await getUserListSize();

        if (isError(list) || isError(fullListSize)) {
            console.error('list or fullListSize is error');
            return {
                list: [],
                allElementsNumber: 0,
            };
        }

        return {
            list: list.map((userData: MongoUserType): EnhancedTableBodyCellType => {
                const {id, role, login, registerDate, rating} = userData;

                return {
                    id,
                    role,
                    login,
                    rating,
                    registerDate: timeToHumanString(registerDate),
                };
            }),
            allElementsNumber: fullListSize,
        };
    }

    return (
        <div className={appStyle.app}>
            <Table getData={enhancedTableGetUserList} header={enhancedTableHeader}/>
        </div>
    );
}
