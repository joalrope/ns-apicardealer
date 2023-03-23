import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
/*@UsePipes(ValidationPipe)*/
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.FindAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post()
  /*@UsePipes(ValidationPipe)*/
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto);
  }

  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() createCarDto: CreateCarDto) {
    const carBD = this.carsService.findOneById(id);

    if (createCarDto.brand) carBD.brand = createCarDto.brand;
    if (createCarDto.model) carBD.model = createCarDto.model;

    return carBD;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }
}
