import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AssessmentModule } from './assessment/assessment.module';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [AuthModule, DbModule, ConfigModule.forRoot({isGlobal: true}), UsersModule, AssessmentModule ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
