import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {TodosInput} from './inputs/todos.input';
import {TodosOutput} from './outputs/todos.output';
import {CreateTodoInput} from './inputs/create-todo.input';
import {UpdateTodoInput} from './inputs/update-todo.input';
import {switchMap} from 'rxjs/operators';
import {extract} from '@utilities/graphql';
import {Todo} from '@core/todo/todo.entity';

@Injectable()
export class TodoResolver {

    constructor(private apollo: Apollo) {
    }

    todos(input: TodosInput): Observable<TodosOutput> {
        return this.apollo
        .query<any>({
            variables: {input},
            query: gql`query todos($input: TodosInput!) {
                todos(input: $input) {
                    total
                    hasMore
                    items {
                        ID
                        doneAt
                        content
                        createdAt
                        updatedAt
                    }
                }
            }`,
        })
        .pipe(switchMap(body => extract(body, 'todos')));
    }

    createTodo(input: CreateTodoInput): Observable<Todo> {
        return this.apollo
        .mutate<any>({
            variables: {input},
            mutation: gql`mutation createTodo($input: CreateTodoInput!) {
                createTodo(input: $input) {
                    ID
                    content
                    createdAt
                }
            }`
        })
        .pipe(switchMap(body => extract(body, 'createTodo')));
    }

    updateTodo(ID: number, input: UpdateTodoInput): Observable<Todo> {
        return this.apollo
        .mutate<any>({
            variables: {ID, input},
            mutation: gql`mutation updateTodo($ID: Float!, $input: UpdateTodoInput!) {
                updateTodo(ID: $ID, input: $input) {
                    content
                    updatedAt
                }
            }`,
        })
        .pipe(switchMap(body => extract(body, 'updateTodo')));
    }

    doneTodo(ID: number): Observable<Todo> {
        return this.apollo
        .mutate<any>({
            variables: {ID},
            mutation: gql`mutation doneTodo($ID: Float!) {
                doneTodo(ID: $ID) {
                    doneAt
                    updatedAt
                }
            }`,
        })
        .pipe(switchMap(body => extract(body, 'doneTodo')));
    }

    undoneTodo(ID: number): Observable<Todo> {
        return this.apollo
        .mutate<any>({
            variables: {ID},
            mutation: gql`mutation undoneTodo($ID: Float!) {
                undoneTodo(ID: $ID) {
                    doneAt
                    updatedAt
                }
            }`,
        })
        .pipe(switchMap(body => extract(body, 'undoneTodo')));
    }

    deleteTodo(ID: number): Observable<Todo> {
        return this.apollo
        .mutate<any>({
            variables: {ID},
            mutation: gql`mutation deleteTodo($ID: Float!) {
                deleteTodo(ID: $ID)
            }`,
        })
        .pipe(switchMap(body => extract(body, 'deleteTodo')));
    }
}
