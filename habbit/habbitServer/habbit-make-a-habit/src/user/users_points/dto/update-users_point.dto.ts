import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersPointDto } from './create-users_point.dto';

export class UpdateUsersPointDto extends PartialType(CreateUsersPointDto) {}
