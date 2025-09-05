import { Test, TestingModule } from '@nestjs/testing';
import { LocationControllerV1, LocationControllerV2 } from './location.controller';
import { LocationService } from './location.service';
import { NotFoundException } from '@nestjs/common';

describe('LocationController V1 & V2', () => {
  let controllerV1: LocationControllerV1;
  let controllerV2: LocationControllerV2;
  let service: LocationService;

  const mockLocationService = {
    findLocationByIpV1: jest.fn(),
    findLocationByIpV2: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationControllerV1, LocationControllerV2],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    controllerV1 = module.get<LocationControllerV1>(LocationControllerV1);
    controllerV2 = module.get<LocationControllerV2>(LocationControllerV2);
    service = module.get<LocationService>(LocationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('V1 - Linear Search', () => {
    it('should return location when found', async () => {
      const mockIp = '8.8.8.8';
      const mockLocation = { country: 'US', city: 'California' };

      mockLocationService.findLocationByIpV1.mockResolvedValue(mockLocation);

      const result = await controllerV1.getLocationByIpV1({ params: { ip: mockIp } });

      expect(service.findLocationByIpV1).toHaveBeenCalledWith(mockIp);
      expect(result).toEqual(mockLocation);
    });

    it('should throw NotFoundException when location not found', async () => {
      const mockIp = '0.0.0.0';

      mockLocationService.findLocationByIpV1.mockImplementation(() => {
        throw new NotFoundException('Location not found');
      });

      await expect(
        controllerV1.getLocationByIpV1({ params: { ip: mockIp } }),
      ).rejects.toThrow(NotFoundException);

      expect(service.findLocationByIpV1).toHaveBeenCalledWith(mockIp);
    });
  });

  describe('V2 - Binary Search', () => {
    it('should return location when found', async () => {
      const mockIp = '8.8.8.8';
      const mockLocation = { country: 'US', city: 'California' };

      mockLocationService.findLocationByIpV2.mockResolvedValue(mockLocation);

      const result = await controllerV2.getLocationByIpV2({ params: { ip: mockIp } });

      expect(service.findLocationByIpV2).toHaveBeenCalledWith(mockIp);
      expect(result).toEqual(mockLocation);
    });

    it('should throw NotFoundException when location not found', async () => {
      const mockIp = '0.0.0.0';

      mockLocationService.findLocationByIpV2.mockImplementation(() => {
        throw new NotFoundException('Location not found');
      });

      await expect(
        controllerV2.getLocationByIpV2({ params: { ip: mockIp } }),
      ).rejects.toThrow(NotFoundException);

      expect(service.findLocationByIpV2).toHaveBeenCalledWith(mockIp);
    });
  });
});
