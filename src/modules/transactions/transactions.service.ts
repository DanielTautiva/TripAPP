import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { exceptionHandler } from 'src/common/exception.handler';
import { CreatePaymentGateWayDto, CreatePaymentSourceDto, CreateTransactionDto } from './transactions.dtos';
import { generateUniqueReference } from 'src/common/generate.reference';
import { generateRandomCard } from 'src/common/random.card';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class TransactionsService {

    private readonly config: Record<string, string>;
    private wompiPublicKey: string;

    constructor(
      @InjectRepository(Transaction)
      private transactionRepository: Repository<Transaction>,
      private readonly cardsService: CardsService,
      private configService: ConfigService
    ) {
      this.config = this.configService.get('config.integration');
      this.wompiPublicKey = this.config.publicKey;
    }
  
    async getPresignedAcceptanceToken(): Promise<string> {

        const wompiEndpoint = `${this.config.api}/merchants`;
      
        try {
            const response = await axios.get(`${wompiEndpoint}/${this.wompiPublicKey}`);
        
            const presignedAcceptanceToken = response.data.data.presigned_acceptance;
    
            return presignedAcceptanceToken.acceptance_token;
    
        } catch (error) { 

            exceptionHandler("Error al consultar el token de aceptación", error)
        }

    }


    async createPaymentSource(body: CreatePaymentSourceDto): Promise<{message: string, id: number}> {

        const wompiEndpoint = `${this.config.api}/payment_sources`;

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.config.privateKey}`,
        };
        

        let token = await this.cardsService.createWompiCard(generateRandomCard());

        const data = {
            ...body,
            token,
            acceptance_token: await this.getPresignedAcceptanceToken(),
        };

        try {
            const response = await axios.post(wompiEndpoint, data, { headers });
        
            const wompiCardId = response.data.data.id ?? false

            return {
                message: "Metodo de pago generado con exito!",
                id: wompiCardId
            };
        
        } catch (error) { 

            exceptionHandler("Error al crear fuente de pago", error, 404)
        }
    }

    async generateUniquePaymentReference(): Promise<string> {

        let reference: string;

        do {
            reference = generateUniqueReference();
        } while (await this.referenceExists(reference));
    
        return reference;
    }
    
    private async referenceExists(reference: string): Promise<boolean> {
        const existingTransaction = await this.transactionRepository.findOne({ where: { reference } });
        return !!existingTransaction;
    }

    async createTransaction(body: CreateTransactionDto): Promise<any> {

        // Token de aceptacion
        const acceptanceToken: string = await this.getPresignedAcceptanceToken();

        // Generar una Referencia única
        const reference: string = await this.generateUniquePaymentReference();

        // Generar Id de la fuente de pago
        const idSourcePayment: any = await this.createPaymentSource({
            type: "CARD",
            customer_email: body.email
        }); 


        // Payload transaction
        let data = {
            acceptance_token: acceptanceToken, //Token de aceptacion
            amount_in_cents: (body.totalAmount * 100), //Monto current centavos
            currency: "COP", 
            customer_email: body.email, // Email del usuario
            payment_method: {
              installments: 1 // Número de cuotas si la fuente de pago representa una tarjeta de lo contrario el campo payment_method puede ser ignorado.
            },
            reference: reference, // Referencia única de pago
            payment_source_id: idSourcePayment.id // ID de la fuente de pago
        }

        const wompiEndpoint = `${this.config.api}/transactions`;

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.config.privateKey}`,
        };

        try {
            
            const response = await axios.post(wompiEndpoint, data, { headers });

            if(response.data.data.id){

                const createTransaction = {
                    idTrip: body.idTrip,
                    totalAmount: (body.totalAmount * 100),
                    idWompi: response.data.data.id,
                    reference
                }
    
                // Crear la entidad de transacción
                const transaction = this.transactionRepository.create(createTransaction);
            
                // Guardar la transacción en la base de datos
                return {
                    message: "Pago generado con exito!",
                    transaction: await this.transactionRepository.save(transaction)
                };
                
                
            }
      
            exceptionHandler("No fue posible generar la transaccion")
            
        } catch (error) { 
            exceptionHandler("Error al generar la transaccion", error)
        }
    }

}