import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { FindUserDTO, CreateUserDTO } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Get()
  public findAll(@Query() pagination: PaginationOptionsDTO) {
    // return this.usersService.findAll({ pagination });
  }
}
