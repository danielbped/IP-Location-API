import { ApiProperty } from "@nestjs/swagger";

export class LocationSchemaResponse {
  @ApiProperty({
    type: Number,
    description: 'Lower IP ID',
    example: 16820736
  })
  lower: number

  @ApiProperty({
    type: Number,
    description: 'Upper IP ID',
    example: 16820991
  })
  upper: number

  @ApiProperty({
    type: String,
    description: 'Country Code',
    example: 'TH'
  })
  countryCode: string

  @ApiProperty({
    type: String,
    description: 'Country',
    example: 'Thailand'
  })
  country: string

  @ApiProperty({
    type: String,
    description: 'State/Region',
    example: 'Surat Thani'
  })
  state: string

  @ApiProperty({
    type: String,
    description: 'City',
    example: 'Ko Samui'
  })
  city: string
}