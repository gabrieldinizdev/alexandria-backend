import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';

import { SelectModelFieldsType } from '@/shared/types';
import { generateCode } from '@/shared/utils';
import { forgotPasswordTemplate } from '@/templates/auth';

import { CustomersService } from '../customer/customer.service';
import { RedisService } from '../redis/redis.service';
import { ResetPasswordDTO, VerificationCodeDTO } from './dtos';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { SaveCustomerCodeProps, SmtpConfigProps } from './types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private smtpConfig: SmtpConfigProps;
  private transporter: nodemailer.Transporter;

  public constructor(
    private readonly customerService: CustomersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.smtpConfig = {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.getOrThrow('EMAIL_ALEXANDRIA'),
        pass: this.configService.getOrThrow('EMAIL_ALEXANDRIA_PASSWORD'),
      },
    };
    this.transporter = nodemailer.createTransport(this.smtpConfig);
  }

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
    } catch (error: any) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('customer not found');
        throw new UnauthorizedException('Credentials are invalid');
      }
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credentials are invalid');
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
    } catch (error: any) {
      if (error.status === HttpStatus.CONFLICT) {
        this.logger.error('Email already exists');
        throw new ConflictException('Customer already exists');
      }
    }

    const { data } = await this.customerService.createOne(dto);

    delete data.password;

    return { data };
  }

  public async sendVerificationCode({ email }: VerificationCodeDTO) {
    const expirationCode = this.configService.getOrThrow(
      'REDIS_EXPIRATION_CODE',
    );

    const customer = await this.customerService.findOneByEmail(email);

    const code = generateCode(6);
    await this.redisService.save(
      `verification-code.${code}`,
      { email, code },
      expirationCode,
    );

    const template = Handlebars.compile(forgotPasswordTemplate);

    const data = {
      code,
      resetLink: this.configService.getOrThrow('EMAIL_FORGOT_PASSWORD_LINK'),
    };

    const result = template(data);

    try {
      this.transporter.sendMail({
        from: this.configService.getOrThrow('EMAIL_ALEXANDRIA'),
        to: customer.data.email,
        subject: 'Alexandria-Support: Password Recovery',
        html: result,
      });

      return { data: true };
    } catch (error: any) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error on send email');
    }
  }

  public async resetPassword(dto: ResetPasswordDTO) {
    const { code, confirmPassword, password } = dto;

    const response = await this.redisService.get(`verification-code.${code}`);
    const redisUser: SaveCustomerCodeProps = JSON.parse(response);

    if (!redisUser) throw new BadRequestException('Invalid code');

    const isPasswordMatch = password === confirmPassword;

    if (!isPasswordMatch) {
      throw new UnauthorizedException('passwords do not match');
    }

    const { data } = await this.customerService.findOneByEmail(redisUser.email);

    const result = await this.customerService.updateOne(data.id, { password });

    delete result.data.password;

    return result;
  }
}
