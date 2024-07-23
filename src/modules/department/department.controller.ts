import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { DepartmentService } from './department.service';
import {
  CreateDepartmentDTO,
  FindOneDepartmentByIdDTO,
  UpdateDepartmentDTO,
} from './dto';
import { CreatedOneDepartmentResponseDTO } from './responses';
import { DeletedOneDepartmentResponseDTO } from './responses/deleted-one-department.dto';
import { FoundOneDepartmentResponseDTO } from './responses/found-one-department.dto';

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
  public async createOne(@Body() createDepartmentDTO: CreateDepartmentDTO) {
    return this.departmentService.createOne(createDepartmentDTO);
  }

  @ApiOperation({
    description: 'Find all Departments',
    summary: 'Find all',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Department response object',
    type: CreatedOneDepartmentResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findall() {
    return this.departmentService.findAll();
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
  public async FindOneById(@Param() { id }: FindOneDepartmentByIdDTO) {
    return this.departmentService.findOneById(id);
  }

  @ApiOperation({
    description: 'Update departments',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Department response object',
    type: CreatedOneDepartmentResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async updateOneById(
    @Body() updateDepartmentDTO: UpdateDepartmentDTO,
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
