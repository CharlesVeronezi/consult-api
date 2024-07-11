import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfessionalService } from './professional/professional.service';
import { ProfessionalModule } from './professional/professional.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ProfessionalModule, CompanyModule],
  controllers: [AppController],
  providers: [ProfessionalService],
})
export class AppModule {}
