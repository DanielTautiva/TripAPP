import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTripDto, CompleteTripDto } from './dtos/trips.dto'
import { Trip } from './entitys/trips.entity';
import { TripStatus } from './entitys/tripstatus.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entitys/users.entity';
import { differenceInMinutes, parseISO } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TripsService {

    private token;

    constructor(
        @InjectRepository(Trip)
        private readonly tripRepository: Repository<Trip>,
        @InjectRepository(TripStatus)
        private readonly tripStatusRepository: Repository<TripStatus>,
        private readonly usersService: UsersService,
        @Inject(REQUEST) private request: Request,
        public jwt: JwtService,
    ) {
        const { authorization } = this.request.headers;
        this.token = this.jwt.verify(authorization.split(' ')[1]);
    }

    /**
     * Requests a new trip assigning an available driver to the specified passenger.
     * @param createTripDto Data for the requested trip.
     * @returns Object representing the newly created trip.
     * @throws NotFoundException if the passenger is not found or no drivers are available.
     */
    async requestTrip(createTripDto: CreateTripDto): Promise<Trip> {

        const passenger = await this.usersService.findByEmail(createTripDto.email);

        if (!passenger) {
        throw new NotFoundException('Passenger not found');
        }

        // Lógica para asignar un conductor
        const driver = await this.findAvailableDriver();

        if (!driver) {
        throw new NotFoundException('No available driver');
        }

        // Crea un nuevo viaje asignando al pasajero y conductor
        let trip = this.tripRepository.create({
            passenger,
            driver,
            start_location: createTripDto.current_latitude.concat("&", createTripDto.current_longitude),
            end_location: createTripDto.destine_latitude.concat("&", createTripDto.destine_longitude),
        });

        // Guarda el nuevo viaje en la base de datos
        return this.tripRepository.save(trip);

    }

    /**
     * Finds and returns a random available driver among the registered drivers.
     * @returns Object representing the available driver or undefined if no drivers are available.
     */
    async findAvailableDriver(): Promise<User | undefined> {
        const drivers = await this.usersService.findDrivers();

        if (drivers.length === 0) {
        return undefined;
        }

        const randomIndex = Math.floor(Math.random() * drivers.length);
        return drivers[randomIndex];
    }

    /**
     * Completes a registered trip, calculates the total fare, and updates the trip status.
     * @param completeTripDto Data for completing the trip.
     * @returns Object representing the completed trip with the calculated fare.
     * @throws NotFoundException if the trip is not found or not authorized to be updated.
     */

    async completeTrip(completeTripDto: CompleteTripDto): Promise<Trip> {

        let trip = await this.tripRepository.findOne({where: {id: completeTripDto.id}});

        if (!trip) {
        throw new NotFoundException('Trip not found');
        }   

        trip = await this.tripRepository
            .createQueryBuilder('trip')
            .where('(trip.passenger = :userId OR trip.driver = :userId)', { userId: this.token.id })
        .getOne();

        if (!trip) {
        throw new NotFoundException('Updating the status is only allowed for the passenger or the driver of this trip.');
        }   

        trip.complete_at = new Date();

        // Calcular la distancia en linea recta entre los dos puntos
        const startLocation = trip.start_location.split('&');
        const endLocation = trip.end_location.split('&');

        const distanceInKm = this.calculateDistanceInKm(startLocation, endLocation);

        // Calcular el tiempo transcurrido en minutos entre las fechas de inicio y finalización
        const timeElapsedInMinutes = this.calculateTimeElapsedInMinutes(
            trip.created_at.toISOString(),
            trip.complete_at.toISOString(),
        );

        // Calcular el monto total a pagar según las tarifas proporcionadas
        const baseFare = 3500;
        const distanceFare = 1000 * distanceInKm;
        const timeFare = 200 * timeElapsedInMinutes;
    
        const totalAmount = Math.round(baseFare + distanceFare + timeFare);
  
        // Guardar la trip    
        let result: any = await this.tripRepository.save(trip);

        result.total_amount = totalAmount;
        result.format_amount = this.formatToColombianPesos(totalAmount);

        return result;
    }

    private calculateDistanceInKm(
        startLocation: string[],
        endLocation: string[],
    ): number { 
        
        const lat1 = parseFloat(startLocation[0]);
        const lon1 = parseFloat(startLocation[1]);
        const lat2 = parseFloat(endLocation[0]);
        const lon2 = parseFloat(endLocation[1]);
        
        const R = 6371; // Radio de la Tierra en kilómetros

        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);

        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distancia en kilómetros

        return distance;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    private calculateTimeElapsedInMinutes(startTime: string, endTime: string): number {
        const startDate = parseISO(startTime);
        const endDate = parseISO(endTime);

        return differenceInMinutes(endDate, startDate);
    }

    private formatToColombianPesos(amount: number): string {
        const formattedAmount = amount.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
        });

        return formattedAmount;
    }

}