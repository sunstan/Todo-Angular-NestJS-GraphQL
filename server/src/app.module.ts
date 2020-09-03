import {Module} from '@nestjs/common';
import {TodoModule} from './todo/todo.module';
import {CoreModule} from '@core/core.module';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        TodoModule,
        CoreModule,
        ConfigModule.forRoot({isGlobal: true})
    ],
})
export class AppModule {}
