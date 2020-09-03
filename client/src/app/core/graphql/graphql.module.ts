import {NgModule} from '@angular/core';
import {environment} from '@env/environment';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    exports: [HttpClientModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => ({
                link: httpLink.create({uri: environment.graphql}),
                cache: new InMemoryCache(),
            }),
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {}
