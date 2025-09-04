import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { LocationModule } from "./routes/location/location.module";

@Module({
  imports: [
    LocationModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT || '3310', 10),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}