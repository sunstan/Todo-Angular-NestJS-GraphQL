import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Todo} from '@core/todo/todo.entity';
import {DeleteTodo, DoneTodo, UndoneTodo, UpdateTodo} from '@core/store/todos/todos.actions';
import {FormControl, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
})
export class TodoComponent {

    @Input('todo')
    readonly todo: Todo;

    @ViewChild('input', {static: false})
    readonly input: ElementRef;

    edition: boolean;
    control: FormControl;

    constructor(private store: Store) {}

    toggle(): void {
        this.store.dispatch(this.todo.doneAt
            ? new UndoneTodo(this.todo.ID)
            : new DoneTodo(this.todo.ID)
        )
    }

    edit(): void {
        this.edition = true;
        this.control = new FormControl(this.todo.content, [
            Validators.required,
            Validators.minLength(5)
        ]);
        this.input.nativeElement.focus();
    }

    onSubmit(): void {
        this.store.dispatch(new UpdateTodo(this.todo.ID, {content: this.control.value}));
        this.edition = false;
    }

    onDelete(): void {
        if (confirm('Voulez-vous supprimer cette tache?'))
            this.store.dispatch(new DeleteTodo(this.todo.ID));
    }
}
