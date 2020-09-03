import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm/index';
import {Field, Int, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Entity({name: 'todos'})
export class Todo {

    @Field(type => Int)
    @PrimaryGeneratedColumn()
    readonly ID: number;

    @Field()
    @Column()
    readonly content: string;

    @Field({nullable: true})
    @Column({nullable: true})
    readonly doneAt?: Date;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    constructor(item?: Partial<Todo>) {
        Object.assign(this, item);
    }
}
