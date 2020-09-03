import {TodosInput} from '@core/todo/inputs/todos.input';
import {CreateTodoInput} from '@core/todo/inputs/create-todo.input';

export class GetTodos {
    static readonly type = '[Todos] Get';
    constructor(readonly input: TodosInput) {}
}

export class GetMoreTodos {
    static readonly type = '[Todos] Get More';
    constructor(readonly input: TodosInput) {}
}

export class CreateTodo {
    static readonly type = '[Todos] Create';
    constructor(readonly input: CreateTodoInput) {}
}

export class UpdateTodo {
    static readonly type = '[Todos] Update';
    constructor(readonly ID: number, readonly input: CreateTodoInput) {}
}

export class DoneTodo {
    static readonly type = '[Todos] Done';
    constructor(readonly ID: number) {}
}

export class UndoneTodo {
    static readonly type = '[Todos] Undone';
    constructor(readonly ID: number) {}
}

export class DeleteTodo {
    static readonly type = '[Todos] Delete';
    constructor(readonly ID: number) {}
}
