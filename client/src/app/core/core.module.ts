import {NgModule} from '@angular/core';
import {GraphQLModule} from './graphql/graphql.module';
import {TodoModule} from '@core/todo/todo.module';
import {StoreModule} from '@core/store/store.module';

@NgModule({
    imports: [
        TodoModule,
        GraphQLModule,
        StoreModule,
    ],
})
export class CoreModule {}
