import {BadRequestException} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CreateTodoInput} from './inputs/create-todo.input';
import {UpdateTodoInput} from './inputs/update-todo.input';
import {TodosOutput} from './outputs/todos.output';
import {TodosInput} from './inputs/todos.input';
import {TodoService} from './todo.service';
import {Todo} from './todo.entity';

@Resolver()
export class TodoResolver {

    constructor(readonly todoService: TodoService) {}

    @Query(returns => TodosOutput)
    async todos(@Args('input') input: TodosInput): Promise<TodosOutput> {

        const total: number = await this.todoService.count();
        const items: Todo[] = await this.todoService.findMany(input.take, input.skip);
        const hasMore: boolean = total > input.skip + input.take;
        return {total, items, hasMore} as TodosOutput;
    }

    @Mutation(returns => Todo)
    async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {

        if (!input.content) throw new BadRequestException('Content is required');
        return await this.todoService.create(input);
    }

    @Mutation(returns => Todo)
    async updateTodo(@Args('ID') ID: number,
                     @Args('input') input: UpdateTodoInput): Promise<Todo> {

        return await this.todoService.updateOneByID(ID, input);
    }

    @Mutation(returns => Todo)
    async doneTodo(@Args('ID') ID: number): Promise<Todo> {

        return await this.todoService.updateOneByID(ID, {doneAt: new Date()});
    }

    @Mutation(returns => Todo)
    async undoneTodo(@Args('ID') ID: number): Promise<Todo> {

        return await this.todoService.updateOneByID(ID, {doneAt: null});
    }

    @Mutation(returns => Boolean)
    async deleteTodo(@Args('ID') ID: number): Promise<boolean> {

        return await this.todoService.deleteOneByID(ID);
    }
}
