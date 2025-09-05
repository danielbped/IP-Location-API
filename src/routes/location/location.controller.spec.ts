import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { NotFoundException } from '@nestjs/common';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const mockLocationService = {
    findLocationByIp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getLocationByIp', () => {
    it('should return location when found', async () => {
      const mockIp = '8.8.8.8';
      const mockLocation = { country: 'US', city: 'California' };

      mockLocationService.findLocationByIp.mockResolvedValue(mockLocation);

      const result = await controller.getLocationByIp({ params: { ip: mockIp } });

      expect(service.findLocationByIp).toHaveBeenCalledWith(mockIp);
      expect(result).toEqual(mockLocation);
    });

    it('should throw NotFoundException when location is not found', async () => {
      const mockIp = '0.0.0.0';

      mockLocationService.findLocationByIp.mockImplementation(() => {
        throw new NotFoundException('Location not found');
      });

      await expect(
        controller.getLocationByIp({ params: { ip: mockIp } }),
      ).rejects.toThrow(NotFoundException);

      expect(service.findLocationByIp).toHaveBeenCalledWith(mockIp);
    });
  });
});
