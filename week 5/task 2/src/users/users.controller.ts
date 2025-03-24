import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return { message: 'User Profile', user: req.user };
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  updateUser(
    @Req() req,
    @Body() updateData: { newUsername?: string; newPassword?: string },
  ) {
    return this.usersService.updateUser(
      req.user.username,
      updateData?.newUsername,
      updateData?.newPassword,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  deleteUser(@Req() req) {
    return this.usersService.deleteUser(req.user.username);
  }
}
