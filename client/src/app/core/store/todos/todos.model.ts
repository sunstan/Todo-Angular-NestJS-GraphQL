import {Todo} from '@core/todo/todo.entity';

export class TodosModel {
    readonly total: number;
    readonly hasMore: boolean;
    readonly items: Todo[];
}
