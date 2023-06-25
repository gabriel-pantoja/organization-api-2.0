import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../data/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from '../dtos/user/update-user-password.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.email = createUserDto.email.toLowerCase();
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  findAll(request: Request): Promise<User[]> {
    return this.repository.find({
      where: request.query,
    });
  }

  findAllSelection(): Promise<User[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<User> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    updateUserDto.email = updateUserDto.email.toLowerCase();
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
