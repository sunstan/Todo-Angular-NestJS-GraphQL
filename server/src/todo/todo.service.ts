import {Todo} from './todo.entity';
import {Repository} from 'typeorm/index';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateTodoModel} from './models/create-todo.model';
import {UpdateTodoModel} from './models/update-todo.model';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        readonly repository: Repository<Todo>
    ) {}

    async count(): Promise<number> {
        return await this.repository.count();
    }

    async findOneByID(ID: number): Promise<Todo> {
        return await this.repository.findOne(ID);
    }

    async findMany(take: number, skip: number): Promise<Todo[]> {
        return await this.repository.find({take, skip, order: {ID: 'DESC'}});
    }

    async create(data: CreateTodoModel): Promise<Todo> {
        try {
            const model = new Todo(data);
            const saved = await this.repository.save(model);
            return await this.repository.findOne(saved['ID']);
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateOneByID(ID: number, data: UpdateTodoModel): Promise<Todo> {
        try {
            await this.repository.save({...data, ID});
            return await this.repository.findOne(ID);
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteOneByID(ID: number): Promise<boolean> {
        try {
            return !!await this.repository.delete(ID);
        } catch (e) {
            throw new Error(e);
        }
    }
}
