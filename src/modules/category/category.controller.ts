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

import { PaginationOptionsDTO } from '@/shared/dto/pagination';

import { AuthGuard } from '../auth/auth.guard';
import { CategoryService } from './category.service';
import {
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
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    description: 'Create category with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Department response object',
    type: CreatedOneCategoryResponseDTO,
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
    description: 'Category response object',
    type: FoundAllCategoryResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findall(@Query() pagination: PaginationOptionsDTO) {
    return this.categoryService.findAll({ pagination });
  }

  @ApiOperation({
    description: 'Find one category by id',
    summary: 'Find one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category response object',
    type: FoundOneCategoryByIdResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(@Param() { id }: FindOneCategoryByIdDTO) {
    return this.categoryService.findOneById(id);
  }

  @ApiOperation({
    description: 'Update one category by id',
    summary: 'Update one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category response object',
    type: UpdatedOneCategoryResponseDTO,
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
    description: 'Category response object',
    type: DeletedOneCategoryResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async softDeleteOne(@Param() { id }: FindOneCategoryByIdDTO) {
    return this.categoryService.softDeleteOne(id);
  }
}
