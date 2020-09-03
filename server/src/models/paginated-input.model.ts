import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export abstract class PaginatedInputModel {

    @Field(type => Int, {defaultValue: 10})
    readonly take: number;

    @Field(type => Int, {defaultValue: 0})
    readonly skip: number;
}
