import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Cart } from '@prisma/client';

import { AuthGuard } from '@/modules/auth/auth.guard';
import { PaginationOptionsDTO } from '@/shared/dto/pagination';
import { SelectFieldsDTO } from '@/shared/dto/select-fields';
import { SelectFieldsPipe } from '@/shared/pipes/select-fields/select-fields.pipe';
import {
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from '@/shared/responses/common';
import { SelectModelFieldsType } from '@/shared/types';

import { CartService } from './cart.service';
import { CartDTO, FindOneCartByIdDTO } from './dto';
import { CreateOneCartDTO } from './dto/create-one-cart.dto';
import { UpdateOneCartByIdDTO } from './dto/update-one-cart.dto';
import { FoundAllCartResponseDTO } from './responses';
import { CreatedOneCartResponseDTO } from './responses/created-one-cart.dto';
import { DeletedOneCartResponseDTO } from './responses/deleted-one-cart.dto';
import { FoundOneCartResponseDTO } from './responses/found-one-cart.dto';
import { UpdatedOneCartResponseDTO } from './responses/updated-one-cart.dto';

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    description: 'Create cart with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cart response object',
    type: CreatedOneCartResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Cart response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login Response Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post()
  public async createOne(@Body() createCartDTO: CreateOneCartDTO) {
    return this.cartService.createOne(createCartDTO);
  }

  @ApiOperation({
    description: 'Find all carts with pagination',
    summary: 'Find All',
  })
  @ApiResponse({
    description: 'Find all carts response',
    type: FoundAllCartResponseDTO,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Cart response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CartDTO>,
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Cart>,
  ) {
    return this.cartService.findAll({
      pagination,
      fields: select,
    });
  }

  @ApiOperation({
    description: 'Get one cart by id',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cart response object',
    type: FoundOneCartResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Cart response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cart response object',
    type: RecordNotFoundDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CartDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(
    @Param() { id }: FindOneCartByIdDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Cart>,
  ) {
    return await this.cartService.findOneById(id, select);
  }

  @ApiOperation({
    description: 'Update cart with required fields',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cart response object',
    type: UpdatedOneCartResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async updateOneById(
    @Param() { id }: FindOneCartByIdDTO,
    @Body() updateCartDto: UpdateOneCartByIdDTO,
  ) {
    return await this.cartService.updateOneById(id, updateCartDto);
  }

  @ApiOperation({
    description: 'Delete cart by ID',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cart response object',
    type: DeletedOneCartResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Cart response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cart response object',
    type: RecordNotFoundDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteOneById(@Param() { id }: FindOneCartByIdDTO) {
    return this.cartService.deleteOneById(id);
  }
}
