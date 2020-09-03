export abstract class PaginatedOutputModel<T> {
    readonly items: T[];
    readonly total: number;
    readonly hasMore: boolean;
}
