import {Injectable} from '@nestjs/common';
import {GqlModuleOptions, GqlOptionsFactory} from '@nestjs/graphql';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {

    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
        return {
            autoSchemaFile: 'schema.gql',
            context: ({req, connection}) => connection
                ? {req: connection.context}
                : {req}
        };
    }
}
