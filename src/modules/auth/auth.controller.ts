import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { LoginUserDTO } from './responses';

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
    type: LoginUserDTO,
  })
  @Post('login')
  public async signin(@Body() signinDto: SignInDTO) {
    return this.authService.signIn(signinDto);
  }
}
