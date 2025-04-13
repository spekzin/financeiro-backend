import { PartialType } from '@nestjs/mapped-types';
import { CreateCartoeDto } from './create-cartoe.dto';

export class UpdateCartoeDto extends PartialType(CreateCartoeDto) {}
