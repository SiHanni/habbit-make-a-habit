import { Module } from '@nestjs/common';
import { TotalProgressService } from './total_progress.service';
import { TotalProgressController } from './total_progress.controller';

@Module({
  controllers: [TotalProgressController],
  providers: [TotalProgressService],
})
export class TotalProgressModule {}
