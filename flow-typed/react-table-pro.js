// @flow

declare module 'react-table-pro' {
    declare export type SortDirectionType = 'asc' | 'desc';

    declare export type TableCellAlignType = 'left' | 'center' | 'right';

    declare export type TableHeaderCellType = {|
        +id: string,
        +label: string,
        +align: TableCellAlignType,
        +hasSort: boolean,
    |};

    declare export type TableHeaderType = {|
        +header: string,
        +columnList: Array<TableHeaderCellType>,
    |};

    declare export type TableBodyCellType = {
        // eslint-disable-next-line id-match
        +[key: string]: string | number | boolean | React$Node,
    };

    declare export type TableGetDataResultType = {|
        +list: Array<TableBodyCellType>,
        +count: number,
    |};

    declare export type TableGetDataType = (
        pageIndex: number,
        rowsPerPage: number,
        orderBy: string,
        order: SortDirectionType,
        refreshTable: () => Promise<void>,
    ) => Promise<TableGetDataResultType>;

    declare export type TablePropsType = {|
        +getData: TableGetDataType,
        +header: TableHeaderType,
    |};

    // eslint-disable-next-line id-match
    declare export var Table: React$ComponentType<TablePropsType>;
}

declare module 'react-table-pro/dist/style.css' {
    declare type StyleType = {};

    declare var style: StyleType;

    declare export default typeof style;
}
