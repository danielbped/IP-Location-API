import { Controller, Get } from "@nestjs/common";
import { LocationService } from "./location.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StatusCodes } from "http-status-codes";

@ApiTags('Location')
@Controller('ip')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/location')
  @ApiOperation({ summary: 'Get location by ip' })
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Returns location by id successfully.',
    // type: [LocationSchemaResponse],
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Bad Request.',
  })
  async getLocationByIp() {
    return;
  }
}