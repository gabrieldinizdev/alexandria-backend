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
import { DepartmentService } from './department.service';
import {
  CreateOneDepartmentDTO,
  FindOneDepartmentByIdDTO,
  UpdateOneDepartmentByIdDTO,
} from './dto';
import {
  CreatedOneDepartmentResponseDTO,
  DeletedOneDepartmentResponseDTO,
  FoundAllDepartmentResponseDTO,
  FoundOneDepartmentResponseDTO,
  UpdatedOneDepartmentResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  public constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({
    description: 'Create department with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Department response object',
    type: CreatedOneDepartmentResponseDTO,
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
    description: 'Department response object',
    type: FoundAllDepartmentResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findall(@Query() pagination: PaginationOptionsDTO) {
    return this.departmentService.findAll({ pagination });
  }

  @ApiOperation({
    description: 'Find one department by id',
    summary: 'Find one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Department response object',
    type: FoundOneDepartmentResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(@Param() { id }: FindOneDepartmentByIdDTO) {
    return this.departmentService.findOneById(id);
  }

  @ApiOperation({
    description: 'Update departments',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Department response object',
    type: UpdatedOneDepartmentResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async updateOneById(
    @Body() updateDepartmentDTO: UpdateOneDepartmentByIdDTO,
    @Param() { id }: FindOneDepartmentByIdDTO,
  ) {
    return this.departmentService.updateOne(updateDepartmentDTO, id);
  }

  @ApiOperation({
    description: 'Delete one department by id',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Department response object',
    type: DeletedOneDepartmentResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async softDeleteOne(@Param() { id }: FindOneDepartmentByIdDTO) {
    return this.departmentService.softDeleteOne(id);
  }
}
