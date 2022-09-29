import { randomStringGen } from './../helpers/random';
import { Body, Controller, Post, HttpException, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionModel, ISubsciptionService, SubscriptionDto } from 'casper-lms-types';
import { Course } from 'src/_entities/course.entity';
import { Subscription } from 'src/_entities/subscription.entity';
import { User } from 'src/_entities/user.entity';
import { JwtAuthGuard } from 'src/_stratigies/jwt.strategy';
import { Repository } from 'typeorm';
import { prepareObject } from 'src/config/utils';



@Controller('subscription')
export class SubscriptionController implements ISubsciptionService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Subscription) private subRepo: Repository<Subscription>,
        @InjectRepository(Course) private courseRepo: Repository<Course>,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getSubscriptions(): Promise<SubscriptionDto[]> {
        const subs = await this.subRepo.find({
            relations: {
                user: true
            }
        })
        const prepared = subs.map(sub => {
            return prepareObject([sub, sub.user], SubscriptionDto, sub)
        })
        return prepared
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async postSubscription(@Body() model: CreateSubscriptionModel): Promise<SubscriptionDto> {
        let teacher = await this.userRepo.findOneBy({ email: model.email });
        if (!teacher) {
            teacher = new User();
            teacher.email = model.email;
            teacher.password = randomStringGen(8);
            teacher.role = "teacher";
            await this.userRepo.save(teacher);
        }
        // const courseExist = await this.courseRepo.findOneBy({ name: model.course_name });
        // if (!courseExist) {
        //     throw new HttpException('no course exist with this name', HttpStatus.UNAUTHORIZED);
        // }

        // prepare
        let sub = this.subRepo.create(model);
        // relations
        sub.user = teacher;
        // track and commit
        sub.trackChanges();
        sub = await this.subRepo.save(sub);
        return prepareObject([sub, sub.user], SubscriptionDto, sub, {
            user_id: sub.user.id,
        });
    }

}
