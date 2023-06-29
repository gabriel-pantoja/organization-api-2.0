import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../data/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from '../dtos/user/update-user-password.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PlanEnum } from '../enums/plan.enum';
import { CreateNewUserDto } from '../dtos/user/create-new-user.dto';
import { CreateUserPasswordDto } from '../dtos/user/create-user-password.dto';
import { RedefineUserPasswordDto } from '../dtos/user/redefine-user-password.dto';

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

  async newUser(createNewUserDto: CreateNewUserDto): Promise<any> {
    const quantiyUsers = (await this.findAllByUserId(createNewUserDto.userId))
      .length;
    const userPlanId = (await this.findById(createNewUserDto.userId)).planId;

    createNewUserDto.email = createNewUserDto.email.toLowerCase();
    const user = this.repository.create(createNewUserDto);

    if (userPlanId == PlanEnum.Basic) {
      if (5 == quantiyUsers) {
        throw new BadRequestException(
          `Plano: Basic - Excedeu quantitade de usuários`,
        );
      }
    } else if (userPlanId === PlanEnum.Plus) {
      if (10 == quantiyUsers) {
        throw new BadRequestException(
          `Plano: Plus - Excedeu quantitade de usuários`,
        );
      }
    }

    const response = await this.repository.save(user);
    const payload = { id: response.id, email: response.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      url: process.env.URL + '/#/senha/criar/' + token,
    };
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

  findAllByUserId(userId: number): Promise<User[]> {
    return this.repository.find({
      where: { userId },
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  async resetPassword(id: number): Promise<any> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const hash = await bcrypt.hash(user.firstName, await bcrypt.genSalt());
    const userModel = await this.repository.preload({
      id: id,
      password: hash,
    });
    this.repository.save(userModel);
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      url: process.env.URL + '/#/senha/redefinir/' + token,
    };
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

  async remove(id: number): Promise<any> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.repository.remove(user);
  }

  async createPassword(
    createUserPasswordDto: CreateUserPasswordDto,
  ): Promise<void> {
    const id = this.jwtService.decode(createUserPasswordDto.token)['id'];
    const hash = await bcrypt.hash(
      createUserPasswordDto.password,
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

  async redefinePassword(
    redefineUserPasswordDto: RedefineUserPasswordDto,
  ): Promise<void> {
    const id = this.jwtService.decode(redefineUserPasswordDto.token)['id'];
    const hash = await bcrypt.hash(
      redefineUserPasswordDto.password,
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

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
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
