import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './auth-response.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
