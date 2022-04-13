import { CommonService } from './common.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [CommonService],
  exports: []
})
export class CommonModule {}
