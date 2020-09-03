import {InputType} from '@nestjs/graphql';
import {PaginatedInputModel} from '@models/paginated-input.model';

@InputType()
export class TodosInput extends PaginatedInputModel {

}
