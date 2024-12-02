/* eslint-disable prettier/prettier */
import{IsNotEmpty,IsString, IsNumber} from 'class-validator'


export class UsuarioDto{
    
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;
    
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly grupoInvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numeroExtension: number;

    @IsString()
    @IsNotEmpty()
    readonly rol: string
}

