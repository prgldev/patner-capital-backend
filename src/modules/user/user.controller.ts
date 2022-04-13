import { UserService } from './user.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
} from '@nestjs/common';
import { User } from './models/User';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }
    @Put(':id')
    async updateUser(@Body() user: User) {
        return this.userService.updateUser(user);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
