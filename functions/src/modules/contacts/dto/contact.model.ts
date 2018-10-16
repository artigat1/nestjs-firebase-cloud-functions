import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Contact {
    @ApiModelProperty({ type: String })
    @IsString({ message: 'Provide a first name.' })
    @IsNotEmpty()
    readonly firstName: string;

    @ApiModelProperty({ type: String })
    @IsString({ message: 'Provide a last name.' })
    @IsNotEmpty()
    readonly lastName: string;

    @ApiModelProperty({ type: String })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    readonly email: string;

    @ApiModelProperty({ type: String })
    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly id?: string;
}