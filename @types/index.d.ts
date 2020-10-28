declare module 'react-table-pro' {
    export type SortDirectionType = 'asc' | 'desc';

    export type TableCellAlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify';

    export interface TableHeaderCellType {
        id: string,
        label: string,
        align: TableCellAlignType,
        hasSort: boolean,
    }

    export interface TableHeaderType {
        header: string,
        rowList: Array<TableHeaderCellType>,
    }

    export interface TableBodyCellType {
        // eslint-disable-next-line id-match
        [key: string]: string | number | boolean | React.ReactNode,
    }

    export interface TableGetDataResultType {
        list: Array<TableBodyCellType>,
        allElementsNumber: number,
    }

    export type TableGetDataType = (
        pageIndex: number,
        rowsPerPage: number,
        orderBy: string,
        order: SortDirectionType,
        refreshTable: () => Promise<any>,
    ) => Promise<TableGetDataResultType>;

    export interface TablePropsType {
        getData: TableGetDataType,
        header: TableHeaderType,
    }

    // eslint-disable-next-line id-match
    export const Table: React.FC<TablePropsType>;
}

declare module 'react-table-pro/dist/style.css' {
    type StyleType = {};

    const style: StyleType;

    export default style;
}
