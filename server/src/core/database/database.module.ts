import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({

                type: 'mysql',

                port: config.get<number>('DB_PORT'),
                host: config.get<string>('DB_HOST'),

                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_DATABASE'),

                synchronize: true,
                entities: ['dist/**/*.entity{.ts,.js}'],

                ssl: config.get<string>('NODE_ENV') === 'production',
                extra: config.get<string>('NODE_ENV') === 'production'
                    ? {ssl: {rejectUnauthorized: false}}
                    : null,
            })
        })
    ]
})
export class DatabaseModule {}
