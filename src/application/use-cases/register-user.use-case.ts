import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(
    email: string,
    password: string,
    role: 'Admin' | 'Editor' | 'Author' | 'Viewer' = 'Viewer',
  ): Promise<Omit<User, 'password'>> {
    const exists = await this.userRepo.findOneBy({ email });
    if (exists) throw new ConflictException('User already exists');

    const hashed: string = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      password: hashed,
      role,
    });

    const saved = await this.userRepo.save(user);
    // @ts-ignore
    delete saved.password;
    return saved;
  }
}
