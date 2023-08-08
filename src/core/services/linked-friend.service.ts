import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkedFriendDto } from '../dtos/linked-friend/create-linked-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkedFriend } from 'src/data/entities/linked-friend.entity';
import { Request } from 'express';
import { FriendStatusEnum } from '../enums/friend-status.enum';
import { UserService } from './user.service';
import { ProfileIdEnum } from '../enums/profile.enum';
import { LinkedDebtUserService } from './linked-debt-user.service';

@Injectable()
export class LinkedFriendService {
  constructor(
    @InjectRepository(LinkedFriend)
    private repository: Repository<LinkedFriend>,
    private userService: UserService,
    private linkedDebtUserService: LinkedDebtUserService,
  ) {}

  async create(
    createLinkedFriendDto: CreateLinkedFriendDto,
  ): Promise<LinkedFriend> {
    if (createLinkedFriendDto.userId == createLinkedFriendDto.friendId) {
      throw new BadRequestException(`can't be the same`);
    }
    const user = await this.userService.findById(createLinkedFriendDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User ${createLinkedFriendDto.userId} not found`,
      );
    }

    if (user.profileId != ProfileIdEnum.Admin) {
      throw new BadRequestException(
        `User ${createLinkedFriendDto.userId} no have plan`,
      );
    }

    const hasLinkedFriend = await this.findOneByFriendId(
      createLinkedFriendDto.userId,
      createLinkedFriendDto.friendId,
    );
    if (hasLinkedFriend) {
      throw new BadRequestException(
        `Friend ${createLinkedFriendDto.friendId} exist`,
      );
    }

    const linkedFriendList = await this.findByFriendId(
      createLinkedFriendDto.userId,
    );

    linkedFriendList.forEach((x) => {
      if (x.userId === createLinkedFriendDto.friendId) {
        if (x.status === FriendStatusEnum.Pending) {
          throw new BadRequestException(
            `Friend ${createLinkedFriendDto.friendId} pending`,
          );
        } else if (x.status === FriendStatusEnum.Accepted) {
          throw new BadRequestException(
            `Friend ${createLinkedFriendDto.friendId} accepted`,
          );
        }
      }
    });

    const friend = await this.userService.findById(
      createLinkedFriendDto.friendId,
    );
    if (!friend) {
      throw new NotFoundException(
        `User ${createLinkedFriendDto.friendId} not found`,
      );
    }

    if (friend.profileId != ProfileIdEnum.Admin) {
      throw new BadRequestException(
        `Friend ${createLinkedFriendDto.friendId} no have plan`,
      );
    }

    const linkedFriend = this.repository.create(createLinkedFriendDto);
    linkedFriend.status = FriendStatusEnum.Pending;
    return this.repository.save(linkedFriend);
  }

  findAll(request: Request): Promise<LinkedFriend[]> {
    return this.repository.find({
      relations: { friend: true, user: true },
      where: request.query,
    });
  }

  findByFriendId(friendId: number): Promise<LinkedFriend[]> {
    return this.repository.find({
      where: { friendId },
    });
  }

  findOneById(id: number): Promise<LinkedFriend | undefined> {
    return this.repository.findOne({
      relations: { friend: true },
      where: { id },
    });
  }

  findOneByFriendId(userId: number, friendId: number): Promise<LinkedFriend> {
    return this.repository.findOne({
      where: { userId, friendId },
    });
  }

  findAllSelection(request: Request): Promise<LinkedFriend[]> {
    return this.repository.find({
      relations: { friend: true, user: true },
      where: request.query,
    });
  }

  async updateStatus(id: number): Promise<LinkedFriend> {
    const linkedFriend = await this.repository.preload({
      id: id,
      status: FriendStatusEnum.Accepted,
    });
    if (!linkedFriend) {
      throw new NotFoundException(`LinkedFriend ${id} not found`);
    }
    return this.repository.save(linkedFriend);
  }

  async remove(id: number): Promise<any> {
    const linkedFriend = await this.findOneById(id);
    if (!linkedFriend) {
      throw new NotFoundException(`LinkedFriend ${id} not found`);
    }
    const debt = await this.linkedDebtUserService.findByUserId(
      linkedFriend.userId,
    );
    if (debt) {
      throw new BadRequestException(`Debito vinculado este usuário`);
    }
    return this.repository.remove(linkedFriend);
  }
}
