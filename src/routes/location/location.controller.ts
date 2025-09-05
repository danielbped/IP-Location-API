import { Controller, Get, Request } from "@nestjs/common";
import { LocationService } from "./location.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StatusCodes } from "http-status-codes";
import { LocationSchemaResponse } from "../../schemas/location.schema";

@ApiTags('Location')
@Controller('v1/ip')
export class LocationControllerV1 {
  constructor(private readonly locationService: LocationService) {}

  @Get('/location/:ip')
  @ApiOperation({ summary: 'Get location by ip using linear search' })
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Returns location by id successfully.',
    type: [LocationSchemaResponse],
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Location not found.',
  })
  async getLocationByIpV1(@Request() req): Promise<any> {
    const { params } = req
    const ip = params.ip
    return this.locationService.findLocationByIpV1(ip);
  }
}

@ApiTags('Location')
@Controller('v2/ip')
export class LocationControllerV2 {
  constructor(private readonly locationService: LocationService) {}

  @Get('/location/:ip')
  @ApiOperation({ summary: 'Get location by ip using binary search' })
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Returns location by id successfully.',
    type: [LocationSchemaResponse],
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Location not found.',
  })
  async getLocationByIpV2(@Request() req): Promise<any> {
    const { params } = req
    const ip = params.ip
    return this.locationService.findLocationByIpV2(ip);
  }
}