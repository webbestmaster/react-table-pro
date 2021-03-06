declare module 'react-table-pro' {
    export type SortDirectionType = 'asc' | 'desc';

    export type TableCellAlignType = 'left' | 'center' | 'right';

    export interface TableHeaderCellType {
        id: string,
        label: string,
        align: TableCellAlignType,
        hasSort: boolean,
    }

    export interface TableHeaderType {
        title: string,
        columnList: Array<TableHeaderCellType>,
    }

    export interface TableBodyCellType {
        // eslint-disable-next-line id-match
        [key: string]: string | number | boolean | React.ReactNode,
    }

    export interface TableGetDataResultType {
        list: Array<TableBodyCellType>,
        count: number,
    }

    export type TableGetDataType = (
        pageIndex: number,
        rowsPerPage: number,
        orderBy: string,
        order: SortDirectionType,
        refreshTable: () => Promise<void>,
    ) => Promise<TableGetDataResultType>;

    export interface TablePropsType {
        getData: TableGetDataType,
        header: TableHeaderType,
    }

    // eslint-disable-next-line id-match
    export const Table: React.FC<TablePropsType>;

    export const sortDirection: { [key in SortDirectionType]: SortDirectionType };
}

declare module 'react-table-pro/dist/style.css' {
    type StyleType = {};

    const style: StyleType;

    export default style;
}
