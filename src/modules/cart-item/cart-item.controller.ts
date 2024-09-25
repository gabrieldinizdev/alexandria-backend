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

import { CartItem } from '@prisma/client';

import { PaginationOptionsDTO, SelectFieldsDTO } from '@/shared/dtos';
import { AuthGuard } from '@/shared/guards';
import { SelectFieldsPipe } from '@/shared/pipes';
import {
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from '@/shared/responses';
import { SelectModelFieldsType } from '@/shared/types';

import { CartItemService } from './cart-item.service';
import {
  CartItemDTO,
  CreateOneCartItemDTO,
  FindOneCartItemByIdDTO,
  UpdateOneCartItemByIdDTO,
} from './dtos';
import {
  CreatedOneCartItemResponseDTO,
  DeletedOneCartItemResponseDTO,
  FoundAllCartItemResponseDTO,
  FoundOneCartItemResponseDTO,
  UpdatedOneCartItemResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Cart Items')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({
    description: 'Create cart item with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cart item response object',
    type: CreatedOneCartItemResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request response Object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post()
  public async createOne(@Body() createItemDTO: CreateOneCartItemDTO) {
    return this.cartItemService.createOne(createItemDTO);
  }

  @ApiOperation({
    description: 'Find all cart items in cart with pagination',
    summary: 'Find All',
  })
  @ApiResponse({
    description: 'Find all cart items in cart response',
    type: FoundAllCartItemResponseDTO,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Cart items response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CartItemDTO>,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<CartItem>,
  ) {
    return this.cartItemService.findAll({
      pagination,
      fields: select,
    });
  }

  @ApiOperation({
    description: 'Get one cart item by id',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item response object',
    type: FoundOneCartItemResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found cart item response object',
    type: RecordNotFoundDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CartItemDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOne(
    @Param() { id }: FindOneCartItemByIdDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<CartItem>,
  ) {
    return await this.cartItemService.findOneById(id, select);
  }

  @ApiOperation({
    description: 'Update cart item with required fields',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cart item response object',
    type: UpdatedOneCartItemResponseDTO,
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
    @Param() { id }: FindOneCartItemByIdDTO,
    @Body() updateItemDto: UpdateOneCartItemByIdDTO,
  ) {
    return this.cartItemService.updateOneById(id, updateItemDto);
  }

  @ApiOperation({
    description: 'Delete cart item by ID',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cart item response object',
    type: DeletedOneCartItemResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not response object',
    type: RecordNotFoundDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteOneById(@Param() { id }: FindOneCartItemByIdDTO) {
    return this.cartItemService.deleteOneById(id);
  }
}
