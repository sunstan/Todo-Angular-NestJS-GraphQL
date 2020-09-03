import {Module} from '@nestjs/common';
import {GraphqlModule} from './graphql/graphql.module';
import {DatabaseModule} from './database/database.module';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
    ],
})
export class CoreModule {}
