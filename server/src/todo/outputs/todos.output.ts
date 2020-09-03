import {Todo} from '../todo.entity';
import {ObjectType} from '@nestjs/graphql';
import {PaginatedOutputModel} from '@models/paginated-output.model';

@ObjectType()
export class TodosOutput extends PaginatedOutputModel(Todo) {
}
