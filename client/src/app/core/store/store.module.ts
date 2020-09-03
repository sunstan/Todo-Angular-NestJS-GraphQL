import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';
import {TodosState} from '@core/store/todos/todos.state';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@env/environment';
import {NgModule} from '@angular/core';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

@NgModule({
    imports: [
        NgxsModule.forRoot(
            [TodosState],
            {developmentMode: !environment.production}),
        NgxsStoragePluginModule.forRoot({
            key: [TodosState],
            storage: StorageOption.SessionStorage,
        }),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
})
export class StoreModule {
}
