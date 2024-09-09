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

import { Item } from '@prisma/client';

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

import {
  CreateOneItemDTO,
  FindOneItemByIdDTO,
  ItemDTO,
  UpdateOneItemByIdDTO,
} from './dto';
import { ItemService } from './item.service';
import {
  CreatedOneItemResponseDTO,
  DeletedOneItemResponseDTO,
  FoundAllItemResponseDTO,
  FoundOneItemResponseDTO,
  UpdatedOneItemResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({
    description: 'Create item with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item response object',
    type: CreatedOneItemResponseDTO,
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
  public async createOne(@Body() createItemDTO: CreateOneItemDTO) {
    return this.itemService.createOne(createItemDTO);
  }

  @ApiOperation({
    description: 'Find all items in cart with pagination',
    summary: 'Find All',
  })
  @ApiResponse({
    description: 'Find all items in cart response',
    type: FoundAllItemResponseDTO,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Items response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<ItemDTO>,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Item>,
  ) {
    return this.itemService.findAll({
      pagination,
      fields: select,
    });
  }

  @ApiOperation({
    description: 'Get one item by id',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item response object',
    type: FoundOneItemResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found item response object',
    type: RecordNotFoundDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<ItemDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOne(
    @Param() { id }: FindOneItemByIdDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Item>,
  ) {
    return await this.itemService.findOneById(id, select);
  }

  @ApiOperation({
    description: 'Update item with required fields',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item response object',
    type: UpdatedOneItemResponseDTO,
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
  @Patch(':id')
  public async updateOneById(
    @Param() { id }: FindOneItemByIdDTO,
    @Body() updateItemDto: UpdateOneItemByIdDTO,
  ) {
    return this.itemService.updateOneById(id, updateItemDto);
  }

  @ApiOperation({
    description: 'Delete item by ID',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item response object',
    type: DeletedOneItemResponseDTO,
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
  public async deleteOneById(@Param() { id }: FindOneItemByIdDTO) {
    return this.itemService.deleteOneById(id);
  }
}
