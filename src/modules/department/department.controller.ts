import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DepartmentService } from './department.service';
import {
  CreateDepartmentDTO,
  FindDepartmentDTO,
  UpdateDepartmentDTO,
} from './dto';
import { CreatedOneDepartmentResponseDTO } from './responses';
import { DeletedOneDepartmentResponseDTO } from './responses/deleted-one-department.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  public constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({
    description: 'Create Department with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Department response object',
    type: CreatedOneDepartmentResponseDTO,
  })
  @Post()
  public async Create(@Body() createDepartmentDTO: CreateDepartmentDTO) {
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
  @Get()
  public async Findall() {
    return this.departmentService.findAll();
  }

  @ApiOperation({
    description: 'Update Departments',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Department response object',
    type: CreatedOneDepartmentResponseDTO,
  })
  @Patch(':id')
  public async Update(
    @Body() updateDepartmentDTO: UpdateDepartmentDTO,
    @Param() { id }: FindDepartmentDTO,
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
  @Delete(':id')
  public async Delete(@Param() { id }: FindDepartmentDTO) {
    return this.departmentService.softDeleteOne(id);
  }
}
