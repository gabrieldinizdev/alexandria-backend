import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { SelectModelFieldsType } from '@/shared/types';

import { CustomersService } from '../customers/customers.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public constructor(
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
    let customer: Awaited<Customer>;

    try {
      const { data } = await this.customerService.findOneByEmail(email, select);
      customer = data;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('The customer was not found');
        throw new UnauthorizedException('The credentials are invalid');
      }
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      throw new UnauthorizedException('The credentials are invalid');
    }

    const expiresIn = this.configService.get('JWT_EXPIRES_IN');

    delete customer.password;
    const customerWithoutPassword = customer;

    const payload = {
      ...customerWithoutPassword,
      expiresIn,
    };

    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return { data: token };
  }

  public async signUp(dto: SignUpDTO) {
    try {
      await this.customerService.verifyEmailExistence(dto.email);
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        this.logger.error('Email already exists');
        throw new ConflictException('Customer already exists');
      }
    }
    console.log('oi');
    const { data } = await this.customerService.createOne(dto);

    delete data.password;

    return { data };
  }
}
