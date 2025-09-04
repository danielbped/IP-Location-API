import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Location from "../../entity/location.entity";
import { LocationService } from "./location.service";
import { LocationController } from "./location.controller";
import { LocationMiddleware } from "../../middleware/location.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService, TypeOrmModule],
})
export class LocationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocationMiddleware)
      .forRoutes({ path: "ip/location", method: RequestMethod.GET })
  }
}