// @flow

import type {SortDirectionType} from './table-type';

export const tableRowsPerPageOptions = [5, 10, 25, 50, 100, 1e3, 5e3, 10e3];
export const defaultRowPerPage: number = tableRowsPerPageOptions[4];

export const sortDirection: {+[key: SortDirectionType]: SortDirectionType} = {
    asc: 'asc',
    desc: 'desc',
};
