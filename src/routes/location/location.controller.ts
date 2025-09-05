import { Controller, Get, Request } from "@nestjs/common";
import { LocationService } from "./location.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StatusCodes } from "http-status-codes";
import { LocationSchemaResponse } from "src/schemas/location.schema";

@ApiTags('Location')
@Controller('ip')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/location/:ip')
  @ApiOperation({ summary: 'Get location by ip' })
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Returns location by id successfully.',
    type: [LocationSchemaResponse],
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Location not found.',
  })
  async getLocationByIp(@Request() req): Promise<any> {
    const { params } = req
    const ip = params.ip
    return this.locationService.findLocationByIp(ip);
  }
}