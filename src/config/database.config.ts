import { User } from './../_entities/user.entity';
import { Course } from './../_entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
export const dbConfig = TypeOrmModule.forRootAsync({
    useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Course],
        synchronize: true,
    })
})