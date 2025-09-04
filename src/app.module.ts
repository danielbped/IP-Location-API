import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LocationModule } from "./routes/location/location.module";

@Module({
  imports: [
    LocationModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}