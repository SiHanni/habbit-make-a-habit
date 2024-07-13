import { PartialType } from '@nestjs/mapped-types';
import { CreateTotalProgressDto } from './create-total_progress.dto';

export class UpdateTotalProgressDto extends PartialType(CreateTotalProgressDto) {}
