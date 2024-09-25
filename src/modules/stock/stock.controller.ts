import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationOptionsDTO } from '@/shared/dtos';
import { AuthGuard } from '@/shared/guards';
import { UnauthorizedResponseDTO } from '@/shared/responses';

import {
  CreateOneStockDTO,
  FindOneStockByIdDTO,
  UpdateOneStockByIdDTO,
} from './dtos';
import {
  CreatedOneStockResponseDTO,
  DeletedOneStockResponseDTO,
  FoundAllStockResponseDTO,
  FoundOneStockByIdResponseDTO,
  UpdatedOneStockResponseDTO,
} from './responses';
import { StockService } from './stock.service';

@ApiBearerAuth()
@ApiTags('Stock')
@Controller('stock')
export class StockController {
  public constructor(private readonly stockService: StockService) {}

  @ApiOperation({
    summary: 'Create one',
    description: 'Create one stock with required fields',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Stock response object',
    type: CreatedOneStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Stock unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post()
  async createOne(@Body() dto: CreateOneStockDTO) {
    return this.stockService.createOne(dto);
  }

  @ApiOperation({
    summary: 'Find all',
    description: 'Find all stock',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock response object',
    type: FoundAllStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Stock unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() pagination: PaginationOptionsDTO) {
    return this.stockService.findAll({
      pagination,
    });
  }

  @ApiOperation({
    summary: 'Find one',
    description: 'Find one stock by with required fields',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock response object',
    type: FoundOneStockByIdResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Stock unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneById(@Param() { id }: FindOneStockByIdDTO) {
    return this.stockService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update one',
    description: 'Update one stock by id with required fields',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock response object',
    type: UpdatedOneStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Stock unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateOneById(
    @Param() { id }: FindOneStockByIdDTO,
    @Query() dto: UpdateOneStockByIdDTO,
  ) {
    return this.stockService.updateOneById(id, dto);
  }

  @ApiOperation({
    summary: 'Delete one',
    description: 'Delete one stock by id with required fields',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock response object',
    type: DeletedOneStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Stock unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async softDeleteById(@Param() { id }: FindOneStockByIdDTO) {
    return this.stockService.softDeleteOne(id);
  }
}
