import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { SelectModelFieldsType } from '@/shared/types';

import { UsersService } from '../users/users.service';
import { SignInDTO } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn({ email, password }: SignInDTO) {
    const select: SelectModelFieldsType<User> = {
      name: true,
      email: true,
      password: true,
      createdAt: true,
      id: true,
    };
    const { data: user } = await this.usersService.findOneByEmail(
      email,
      select,
    );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const expiresIn = this.configService.get('JWT_EXPIRES_IN');

    const payload = {
      ...user,
      expiresIn,
    };

    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return { data: token };
  }
}
