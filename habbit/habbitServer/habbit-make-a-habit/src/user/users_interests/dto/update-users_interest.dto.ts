import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersInterestDto } from './create-users_interest.dto';

export class UpdateUsersInterestDto extends PartialType(CreateUsersInterestDto) {}
