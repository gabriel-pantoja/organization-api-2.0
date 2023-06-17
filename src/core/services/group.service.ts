import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from '../dtos/group/create-group.dto';
import { UpdateGroupDto } from '../dtos/group/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/data/entities/group.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { LinkedUserGroup } from 'src/data/entities/linked-user-group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private repository: Repository<Group>,
  ) {}
  create(createGroupDto: CreateGroupDto) {
    const group = this.repository.create(createGroupDto);
    return this.repository.save(group);
  }

  findAll(request: Request): Promise<Group[]> {
    return this.repository.find({
      where: request.query,
      relations: { linkedUserGroup: { user: true } },
    });
  }

  findById(id: number): Promise<Group> {
    return this.repository.findOne({
      where: { id },
      relations: { linkedUserGroup: { user: true, group: true } },
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    // const group = this.repository.create(updateGroupDto);
    // group.linkedUserGroup = updateGroupDto.linkedUserGroup.map(
    //   (x) =>
    //     ({ id: x.id, groupId: x.groupId, userId: x.userId } as LinkedUserGroup),
    // );
    // group.id = id;
    const group = await this.repository.preload({
      id: id,
      ...updateGroupDto,
    });
    if (!group) {
      throw new NotFoundException(`Group ${id} not found`);
    }
    return this.repository.save(group);
  }

  async remove(id: number) {
    const group = await this.findById(id);
    if (!group) {
      throw new NotFoundException(`Group ${id} not found`);
    }
    return this.repository.remove(group);
  }
}
