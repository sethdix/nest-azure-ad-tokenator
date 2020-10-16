import { Test, TestingModule } from '@nestjs/testing';

import { AzureClientCredentialsModuleParameters } from './azure-client-credentials-module-parameters';
import { AzureClientCredentialsResponse } from './azure-client-credentials-response.interface';
import { AzureClientCredentialsService } from './azure-client-credentials.service';
import { HttpService } from '@nestjs/common';

describe('AzureClientCredentialsService', () => {
  let service: AzureClientCredentialsService;

  // random guids
  const applicationId = '7c7ba479-9eb9-4754-bbb3-8fb347af2a8a';
  const tenantId = 'c40cb468-d4c6-47ba-8139-82d5d3c6377d';
  const clientSecret = '4d2d5322-1e12-446a-8123-74912860aa09';
  let httpService: HttpService;
  let postSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AzureClientCredentialsService,
        {
          provide: HttpService,
          useValue: {
            post: () => null,
          },
        },
        {
          provide: AzureClientCredentialsModuleParameters,
          useValue: {
            applicationId,
            tenantId,
            clientSecret,
          },
        },
      ],
    }).compile();

    service = module.get<AzureClientCredentialsService>(
      AzureClientCredentialsService,
    );

    httpService = module.get<HttpService>(HttpService);

    postSpy = jest.spyOn(httpService, 'post');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getClientCredentialsToken', () => {
    it('should get token', async () => {
      const expectedResponse: AzureClientCredentialsResponse = {
        token_type: 'blahblah',
        expires_in: 'blahblah',
        expires_on: 'blahblah',
        access_token: 'blahblah',
        ext_expires_in: 'blahblah',
        not_before: 'blahblah',
        resource: 'blahblah',
      };
      postSpy.mockReturnValue({
        toPromise: () =>
          Promise.resolve({
            data: expectedResponse,
          }),
      });

      const response = await service.getClientCredentialsToken();

      expect(postSpy).toHaveBeenCalledTimes(1);
      expect(response).toEqual(expectedResponse);
    });
  });
});
