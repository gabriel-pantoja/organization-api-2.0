import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../data/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from '../dtos/user/update-user-password.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.userName = createUserDto.userName.toUpperCase();
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  findAllSelection(): Promise<User[]> {
    return this.repository.find();
  }

  findAll(): Promise<User[]> {
    return this.repository.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
      },
    });
  }

  findById(id: number): Promise<User> {
    return this.repository.findOne({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
      },
      where: { id },
    });
  }

  findByUserName(userName: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { userName } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    updateUserDto.userName = updateUserDto.userName.toUpperCase();
    const user = await this.repository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.repository.remove(user);
  }

  async updatePassword(updateUserPasswordDto: UpdateUserPasswordDto) {
    const id = this.jwtService.decode(updateUserPasswordDto.token)['id'];
    const hash = await bcrypt.hash(
      updateUserPasswordDto.password,
      await bcrypt.genSalt(),
    );
    const user = await this.repository.preload({
      id: id,
      password: hash,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    this.repository.save(user);
  }
}
