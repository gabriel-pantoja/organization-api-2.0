import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkedUserGroupDto } from '../dtos/linked-user-group/create-linked-user-group.dto';
import { UpdateLinkedUserGroupDto } from '../dtos/linked-user-group/update-linked-user-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkedUserGroup } from 'src/data/entities/linked-user-group.entity';

@Injectable()
export class LinkedUserGroupService {
  constructor(
    @InjectRepository(LinkedUserGroup)
    private repository: Repository<LinkedUserGroup>,
  ) {}
  create(createLinkedUserGroupDto: CreateLinkedUserGroupDto) {
    const linkedUserGroup = this.repository.create(createLinkedUserGroupDto);
    return this.repository.save(linkedUserGroup);
  }

  findAll(): Promise<LinkedUserGroup[]> {
    return this.repository.find({
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          userName: true,
          email: true,
        },
      },
      relations: { user: true, group: true },
    });
  }

  findAllSelection(): Promise<LinkedUserGroup[]> {
    return this.repository.find();
  }

  findAllByGroupId(groupId: number): Promise<LinkedUserGroup[]> {
    return this.repository.find({
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          userName: true,
          email: true,
        },
      },
      relations: { user: true, group: true },
      where: { groupId },
    });
  }

  findById(id: number): Promise<LinkedUserGroup> {
    return this.repository.findOne({
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          userName: true,
          email: true,
        },
      },
      relations: { user: true, group: true },
      where: { id },
    });
  }

  async update(id: number, updateLinkedUserGroupDto: UpdateLinkedUserGroupDto) {
    const linkedUserGroup = await this.repository.preload({
      id: id,
      ...updateLinkedUserGroupDto,
    });
    if (!linkedUserGroup) {
      throw new NotFoundException(`User Group ${id} not found`);
    }
    return this.repository.save(linkedUserGroup);
  }

  async remove(id: number) {
    const linkedUserGroup = await this.findById(id);
    if (!linkedUserGroup) {
      throw new NotFoundException(`User Group ${id} not found`);
    }
    return this.repository.remove(linkedUserGroup);
  }

  async removeByUserId(userId: number) {
    const linkedUserGroup = await this.repository.findOneBy({ userId: userId });
    if (!linkedUserGroup) {
      throw new NotFoundException(`User Group By User ${userId} not found`);
    }
    return this.repository.remove(linkedUserGroup);
  }
}
