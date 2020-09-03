import {NgModule} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {TodoComponent} from './components/todo/todo.component';
import {InputComponent} from './components/input/input.component';
import {DirectivesModule} from '@directives/directives.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        InputComponent,
    ],
    imports: [
        CoreModule,
        BrowserModule,
        DirectivesModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
