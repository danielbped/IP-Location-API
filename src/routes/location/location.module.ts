import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { LocationService } from "./location.service";
import { LocationController } from "./location.controller";
import { LocationMiddleware } from "../../middleware/location.middleware";
import { LoadDataset } from '../../helper/loadDataset.helper';
import { FindLocation } from '../../helper/findLocation.helper';

@Module({
  imports: [],
  controllers: [LocationController],
  providers: [LocationService, LoadDataset, FindLocation],
  exports: [LocationService],
})
export class LocationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocationMiddleware)
      .forRoutes({ path: "ip/location", method: RequestMethod.GET })
  }
}