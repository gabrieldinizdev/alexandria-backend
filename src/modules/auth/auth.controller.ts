import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Customer } from '@prisma/client';

import { SelectFieldsPipe } from '@/shared/pipes/select-fields/select-fields.pipe';
import { InvalidEntriesResponseDTO } from '@/shared/responses/common';
import { SelectModelFieldsType } from '@/shared/types';

import { AuthService } from './auth.service';
import { ResetPasswordDTO, VerificationCodeDTO } from './dtos';
import { SignInDTO } from './dtos/sign-in.dto';
import {
  LoginResponseDTO,
  LoginInvalidCredentialsResponseDTO,
} from './responses';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Login user with email and password',
    summary: 'Login',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login Response Object',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Login Response Unauthorized Object',
    type: LoginInvalidCredentialsResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login Response Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @Post('login')
  public async signin(@Body() signinDto: SignInDTO) {
    return this.authService.signIn(signinDto);
  }

  @ApiOperation({
    description: 'Send verification code to costumer email ',
    summary: 'Send verification code',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login Response Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @Post('forgot-password')
  public async sendVerificationCode(
    @Body() { email }: VerificationCodeDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Customer>,
  ) {
    return this.authService.sendVerificationCode({ email }, select);
  }

  @ApiOperation({
    description: 'Reset customer password',
    summary: 'Reset password',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login Response Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @Patch('reset-password')
  public async resetPassword(
    @Body() dto: ResetPasswordDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Customer>,
  ) {
    return this.authService.resetPassword(dto, select);
  }
}
