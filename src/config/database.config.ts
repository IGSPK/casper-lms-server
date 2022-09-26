import { User } from './../_entities/user.entity';
import { Course } from './../_entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
export const dbConfig = TypeOrmModule.forRootAsync({
    useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
        port: Number(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 3306,
        username: process.env.DB_USER ? process.env.DB_USER : 'root',
        password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
        database: process.env.DB_NAME ? process.env.DB_NAME : 'database_name',
        entities: [User, Course],
        synchronize: true,
    })
})