import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: RegisterDto): Promise<User> {
    if (userData.email && (await this.findOneByEmail(userData.email))) {
      throw new BadRequestException(
        'E-Mail already exists',
        'email_already_exists',
      );
    }
    const user = new User();
    user.email = userData.email;
    user.password = await bcrypt.hash(userData.password, 10);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }
}
