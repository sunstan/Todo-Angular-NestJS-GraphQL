import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {GraphqlService} from './graphql.service';

@Module({
    imports: [GraphQLModule.forRootAsync({useClass: GraphqlService})],
    exports: [GraphQLModule],
})
export class GraphqlModule {}
