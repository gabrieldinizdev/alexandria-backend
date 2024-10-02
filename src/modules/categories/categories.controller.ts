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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Category } from '@prisma/client';

import { PaginationOptionsDTO, SelectFieldsDTO } from '@/shared/dtos';
import { AuthGuard } from '@/shared/guards';
import { SelectFieldsPipe } from '@/shared/pipes';
import {
  InvalidEntriesResponseDTO,
  UnauthorizedResponseDTO,
  RecordNotFoundDTO,
  ConflictResponseDTO,
} from '@/shared/responses';
import { SelectModelFieldsType } from '@/shared/types';

import { CategoriesService } from './categories.service';
import {
  CategoryDTO,
  CreateOneCategoryDTO,
  FindOneCategoryByIdDTO,
  UpdateOneCategoryByIdDTO,
} from './dtos';
import {
  CreatedOneCategoryResponseDTO,
  DeletedOneCategoryResponseDTO,
  FoundAllCategoryResponseDTO,
  FoundOneCategoryByIdResponseDTO,
  UpdatedOneCategoryResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryService: CategoriesService) {}

  @ApiOperation({
    description: 'Create category with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Categories response object created',
    type: CreatedOneCategoryResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized categories response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicting categories response object',
    type: ConflictResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post()
  public async createOne(@Body() createCategoryDTO: CreateOneCategoryDTO) {
    return this.categoryService.createOne(createCategoryDTO);
  }

  @ApiOperation({
    description: 'Find All category with required fields',
    summary: 'Find all',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'categories response object ok',
    type: FoundAllCategoryResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized categories response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CategoryDTO>,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Category>,
  ) {
    return this.categoryService.findAll({ pagination, fields: select });
  }

  @ApiOperation({
    description: 'Find one category by id',
    summary: 'Find one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories response object ok',
    type: FoundOneCategoryByIdResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized categories response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found categories  response object',
    type: RecordNotFoundDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CategoryDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(
    @Param() { id }: FindOneCategoryByIdDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Category>,
  ) {
    return this.categoryService.findOneById(id, select);
  }

  @ApiOperation({
    description: 'Update one category by id',
    summary: 'Update one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories response object ok',
    type: UpdatedOneCategoryResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized categories response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found categories response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async updateOneById(
    @Param() { id }: FindOneCategoryByIdDTO,
    @Body() updateUserDTO: UpdateOneCategoryByIdDTO,
  ) {
    return this.categoryService.updateOneById(id, updateUserDTO);
  }

  @ApiOperation({
    description: 'Delete one category by id',
    summary: 'Delete one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories response object ok',
    type: DeletedOneCategoryResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized categories response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found categories response object',
    type: RecordNotFoundDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async softDeleteOne(@Param() { id }: FindOneCategoryByIdDTO) {
    return this.categoryService.softDeleteOne(id);
  }
}
