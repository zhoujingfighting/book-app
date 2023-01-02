import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// This decorator makes prisma module all available to global
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
