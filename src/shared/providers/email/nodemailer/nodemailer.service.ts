import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';

import { CustomersService } from '@/modules/customer/customer.service';
import { RedisService } from '@/shared/providers/cache/redis/redis.service';
import { generateCode } from '@/shared/utils';
import { forgotPasswordTemplate } from '@/templates/auth';

import { ResetPasswordDTO, VerificationCodeDTO } from './dtos';
import { SmtpConfigProps, SaveCustomerCodeProps } from './types';

@Injectable()
export class NodemailerService {
  private readonly logger = new Logger(NodemailerService.name);
  private smtpConfig: SmtpConfigProps;
  private transporter: nodemailer.Transporter;

  public constructor(
    private readonly customerService: CustomersService,
    private readonly configService: ConfigService,
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
