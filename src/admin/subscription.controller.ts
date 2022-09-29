import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionModel, ISubsciptionService, SubscriptionDto } from 'casper-lms-types';
import { Course } from 'src/_entities/course.entity';
import { Subscription } from 'src/_entities/subscription.entity';
import { User } from 'src/_entities/user.entity';
import { Repository } from 'typeorm';

@Controller('subscription')
export class SubscriptionController implements ISubsciptionService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Subscription) private subRepo: Repository<Subscription>,
        @InjectRepository(Course) private courseRepo: Repository<Course>,
    ) { }
    @Post('create')
    async createSubscription(@Body() model: CreateSubscriptionModel): Promise<SubscriptionDto> {
        let teacher = await this.userRepo.findOneBy({ email: model.subscriber_email });
        if (!teacher) {
            // rendom string for password
            let characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            let randomstring = '';
            for (let i = 0; i < 7; i++) {
                let rnum = Math.floor(Math.random() * characters.length);
                randomstring += characters.substring(rnum, rnum + 1);
            }
            // create teacher account
            const newTeacher = new User();
            newTeacher.email = model.subscriber_email;
            newTeacher.password = randomstring;
            newTeacher.name = model.subscriber_name;
            newTeacher.role = "teacher";
            teacher = await this.userRepo.save(newTeacher);
        }
        const courseExist = await this.courseRepo.findOneBy({ name: model.course_name });
        if (!courseExist) {
            throw new HttpException('no course exist with this name', HttpStatus.UNAUTHORIZED);
        }
        // rendom string for password
        let characters = "123456789";
        let randomstring = '';
        for (let i = 0; i < 12; i++) {
            let rnum = Math.floor(Math.random() * characters.length);
            randomstring += characters.substring(rnum, rnum + 1);
        }
        // create subscription
        const subscription = new Subscription();
        subscription.course_name = model.course_name;
        subscription.slots = model.slots;
        subscription.expiry = model.expiry;
        subscription.subs_id = Number(randomstring);
        subscription.created_at = new Date();
        subscription.user = Promise.resolve(teacher);
        const savedSub = await this.subRepo.save(subscription);
        return {
            subs_id: savedSub.subs_id,
            course_name: savedSub.course_name,
            subscriber_name: teacher.name,
            subscriber_email: teacher.email,
            slots: Number(savedSub.slots),
            expiry: savedSub.expiry,
            created_at: savedSub.created_at.toString(),
            updated_at: new Date().toString()
        }
    }

}
