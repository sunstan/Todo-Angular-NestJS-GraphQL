import {Todo} from '@core/todo/todo.entity';
import {PaginatedOutputModel} from '@models/paginated-output.model';

export class TodosOutput extends PaginatedOutputModel<Todo> {}
