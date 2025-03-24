import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  private userFile = path.resolve(__dirname, '..', '..', 'src', 'data.json');

  async readUsers(): Promise<User[]> {
    try {
      if (!fs.existsSync(this.userFile)) {
        throw new NotFoundException('User file not found');
      }

      const data = await fs.promises.readFile(this.userFile, 'utf-8');
      const users: User[] = JSON.parse(data);

      // if (!users.length) {
      //   throw new NotFoundException('Users not Found');
      // }
      return users;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new InternalServerErrorException(
          'Invalid JSON format in user file',
        );
      }
      throw new InternalServerErrorException(
        error.message || 'Error reading user file',
      );
    }
  }

  async writeUser(users: User[]): Promise<void> {
    try {
      const jsonData = JSON.stringify(users, null, 2);
      await fs.promises.writeFile(this.userFile, jsonData, 'utf-8');
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error writing user file',
      );
    }
  }

  async createUser(
    username: string,
    password: string,
  ): Promise<{ message: string }> {
    try {
      if (await this.findByUsername(username)) {
        throw new ConflictException('Username already exists');
      }
      const users = await this.readUsers();
      users.push({ username, password });
      await this.writeUser(users);
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error creating user',
      );
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const users = await this.readUsers();
      const user = users.find((user) => user.username === username) || null;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error finding user',
      );
    }
  }

  async updateUser(
    username: string,
    newUsername?: string,
    newPassword?: string,
  ): Promise<{ message: string }> {
    try {
      const users = await this.readUsers();
      const userIndex = users.findIndex((user) => user.username === username);
      if (userIndex === -1) throw new NotFoundException('User not found');

      const hashedPassword = newPassword
        ? await bcrypt.hash(newPassword, 10)
        : users[userIndex].password;

      users[userIndex] = {
        username: newUsername || users[userIndex].username,
        password: hashedPassword,
      };
      await this.writeUser(users);
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error updating user',
      );
    }
  }

  async deleteUser(username: string): Promise<{ message: string }> {
    try {
      const users = await this.readUsers();
      const filteredUsers = users.filter((user) => user.username !== username);
      if (users.length === filteredUsers.length) {
        throw new NotFoundException('User not found');
      }
      await this.writeUser(filteredUsers);
      return { message: 'user deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error deleting user',
      );
    }
  }
}
