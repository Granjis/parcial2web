/* eslint-disable prettier/prettier */
import{IsNotEmpty,IsString, IsNumber} from 'class-validator'
export class BonoDto 
{
    
    @IsNumber()
    @IsNotEmpty()
    readonly monto: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly calificacion: number;

    @IsString()
    @IsNotEmpty()
    readonly palabraClave: string;
}
