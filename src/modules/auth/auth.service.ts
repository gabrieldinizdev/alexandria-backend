import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { SelectModelFieldsType } from '@/shared/types';

import { CustomersService } from '../customer/customer.service';
import { SignInDTO } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn({ email, password }: SignInDTO) {
    const select: SelectModelFieldsType<Customer> = {
      name: true,
      email: true,
      password: true,
      createdAt: true,
      id: true,
    };
    const { data: customer } = await this.customerService.findOneByEmail(
      email,
      select,
    );

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const expiresIn = this.configService.get('JWT_EXPIRES_IN');

    const payload = {
      ...customer,
      expiresIn,
    };

    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return { data: token };
  }
}
