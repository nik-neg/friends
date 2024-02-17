import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { RemoveFriendDto } from './dto/remove-friend.dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {
  }

  @Post()
  create(@Body() createFriendDto: CreateFriendDto) {
    return this.friendService.create(createFriendDto);
  }

  @Delete()
  remove(@Query() removeFriendDto: RemoveFriendDto) {

    return this.friendService.remove(removeFriendDto);
  }
}
