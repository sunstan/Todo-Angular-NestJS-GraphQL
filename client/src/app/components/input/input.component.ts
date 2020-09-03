import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {CreateTodo} from '@core/store/todos/todos.actions';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
})
export class InputComponent {

    control = new FormControl('', [
        Validators.required,
        Validators.minLength(5)
    ]);

    constructor(private store: Store) {}

    onSubmit(): void {
        this.store.dispatch(new CreateTodo({content: this.control.value}));
        this.control.reset();
    }
}
