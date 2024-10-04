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
import {
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from '@/shared/responses';

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
import { StocksService } from './stocks.service';

@ApiBearerAuth()
@ApiTags('Stocks')
@Controller('stocks')
export class StockController {
  public constructor(private readonly stockService: StocksService) {}

  @ApiOperation({
    summary: 'Create one',
    description: 'Create one stock with required fields',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Stocks response object created',
    type: CreatedOneStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized stocks response object',
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
    description: 'Stocks response object ok',
    type: FoundAllStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized stocks response object',
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
    description: 'Stocks response object ok',
    type: FoundOneStockByIdResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found stocks response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized stocks response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
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
    description: 'Stocks response object ok',
    type: UpdatedOneStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found stocks response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized stocks response object',
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
    description: 'Stocks response object ok',
    type: DeletedOneStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found stocks response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized stocks response object',
    type: UnauthorizedResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async softDeleteById(@Param() { id }: FindOneStockByIdDTO) {
    return this.stockService.softDeleteOne(id);
  }
}
