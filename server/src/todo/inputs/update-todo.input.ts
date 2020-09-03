import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {

    @Field({nullable: true})
    readonly content?: string;
}
