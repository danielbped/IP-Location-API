import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { LocationService } from "./location.service";
import { LocationControllerV1, LocationControllerV2 } from "./location.controller";
import { LocationMiddleware } from "../../middleware/location.middleware";
import { LoadDataset } from '../../helper/loadDataset.helper';
import { FindLocation } from '../../helper/findLocation.helper';

@Module({
  imports: [],
  controllers: [LocationControllerV1, LocationControllerV2],
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