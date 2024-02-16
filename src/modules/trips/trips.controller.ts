import { Controller, Post, Patch, Body, UseGuards } from '@nestjs/common';
import { CreateTripDto, CompleteTripDto } from './dtos/trips.dto';
import { Trip } from './entitys/trips.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { TripsService } from './trips.service';

@UseGuards(AuthGuard)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post('request')
  async requestTrip(@Body() createTripDto: CreateTripDto): Promise<{ message: string, trip: Trip}> {
    return this.tripsService.requestTrip(createTripDto);
  }

  @Patch('complete')
  async completeTrip(
    @Body() completeTripDto: CompleteTripDto,
  ): Promise<{ message: string, trip: Trip}> {
    return this.tripsService.completeTrip(completeTripDto);
  }
}