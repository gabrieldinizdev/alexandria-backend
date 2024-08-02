import { Body, Controller, HttpStatus, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ConflictResponseDTO,
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
} from '@/shared/responses/common';

import { AuthService } from './auth.service';
import { ResetPasswordDTO, VerificationCodeDTO } from './dtos';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import {
  ForgotPasswordResponseDTO,
  LoginInvalidCredentialsResponseDTO,
  LoginResponseDTO,
  ResetPasswordResponseDTO,
  SignUpCustomerResponseDTO,
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
    description: 'Login created response object',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Login unauthorized response object',
    type: LoginInvalidCredentialsResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login bad request response object',
    type: InvalidEntriesResponseDTO,
  })
  @Post('login')
  public async signIn(@Body() signinDto: SignInDTO) {
    return this.authService.signIn(signinDto);
  }

  @ApiOperation({
    description: 'Sign-up Account',
    summary: 'Sign-up',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sign-up created response object',
    type: SignUpCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Sign-up bad request response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Sign-up conflict response object',
    type: ConflictResponseDTO,
  })
  @Post('sign-up')
  public async signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @ApiOperation({
    description: 'Send verification code to costumer email ',
    summary: 'Send verification code',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Verification code response bad request object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Verification code not found response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Verification code created response object',
    type: ForgotPasswordResponseDTO,
  })
  @Post('forgot-password')
  public async sendVerificationCode(@Body() { email }: VerificationCodeDTO) {
    return this.authService.sendVerificationCode({ email });
  }

  @ApiOperation({
    description: 'Reset customer password',
    summary: 'Reset password',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Reset password bad request response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password ok response object',
    type: ResetPasswordResponseDTO,
  })
  @Patch('reset-password')
  public async resetPassword(@Body() dto: ResetPasswordDTO) {
    return this.authService.resetPassword(dto);
  }
}
