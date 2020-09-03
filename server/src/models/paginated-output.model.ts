import {Field, Int, ObjectType} from '@nestjs/graphql';

type ClassType<T> = new() => T;

export function PaginatedOutputModel<T>(Item: ClassType<T>): any {

    @ObjectType({isAbstract: true})
    abstract class PaginatedOutputClass {

        @Field(type => [Item])
        readonly items: T[];

        @Field(type => Int)
        readonly total: number;

        @Field()
        readonly hasMore: boolean;
    }

    return PaginatedOutputClass;
}
