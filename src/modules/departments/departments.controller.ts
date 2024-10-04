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

import { Department } from '@prisma/client';

import { PaginationOptionsDTO, SelectFieldsDTO } from '@/shared/dtos';
import { AuthGuard } from '@/shared/guards';
import { SelectFieldsPipe } from '@/shared/pipes';
import {
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from '@/shared/responses';
import { SelectModelFieldsType } from '@/shared/types';

import { DepartmentsService } from './departments.service';
import {
  CreateOneDepartmentDTO,
  DepartmentDTO,
  FindOneDepartmentByIdDTO,
  UpdateOneDepartmentByIdDTO,
} from './dtos';
import {
  CreatedOneDepartmentResponseDTO,
  DeletedOneDepartmentResponseDTO,
  FoundAllDepartmentResponseDTO,
  FoundOneDepartmentResponseDTO,
  UpdatedOneDepartmentResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  public constructor(private readonly departmentService: DepartmentsService) {}

  @ApiOperation({
    description: 'Create department with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Departments response object created',
    type: CreatedOneDepartmentResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized departments response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post()
  public async createOne(@Body() createDepartmentDTO: CreateOneDepartmentDTO) {
    return this.departmentService.createOne(createDepartmentDTO);
  }

  @ApiOperation({
    description: 'Find all Departments',
    summary: 'Find all',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Departments response object ok',
    type: FoundAllDepartmentResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized departments response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<DepartmentDTO>,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Department>,
  ) {
    return this.departmentService.findAll({ pagination, fields: select });
  }

  @ApiOperation({
    description: 'Find one department by id',
    summary: 'Find one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Departments response object ok',
    type: FoundOneDepartmentResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized departments response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found departments response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<DepartmentDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(
    @Param() { id }: FindOneDepartmentByIdDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Department>,
  ) {
    return this.departmentService.findOneById(id, select);
  }

  @ApiOperation({
    description: 'Update departments',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Departments response object ok',
    type: UpdatedOneDepartmentResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized departments response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found departments response object',
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
    @Body() updateDepartmentDTO: UpdateOneDepartmentByIdDTO,
    @Param() { id }: FindOneDepartmentByIdDTO,
  ) {
    return this.departmentService.updateOne(id, updateDepartmentDTO);
  }

  @ApiOperation({
    description: 'Delete one department by id',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Departments delete response object ok',
    type: DeletedOneDepartmentResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized departments response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found departments response object',
    type: RecordNotFoundDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async softDeleteOne(@Param() { id }: FindOneDepartmentByIdDTO) {
    return this.departmentService.softDeleteOne(id);
  }
}
