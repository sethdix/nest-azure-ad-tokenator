import { Injectable, Module } from '@nestjs/common';

import { AzureClientCredentialsModule } from './azure-client-credentials.module';
import { AzureClientCredentialsService } from './azure-client-credentials.service';
import { NestFactory } from '@nestjs/core';

@Injectable()
export class ConfigService {
  get(key: string): string {
    return process.env[key];
  }
}

// tslint:disable-next-line: max-classes-per-file
@Module({
  imports: [
    AzureClientCredentialsModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          applicationId: configService.get('APPLICATION_ID'),
          tenantId: configService.get('TENANT_ID'),
          clientSecret: configService.get('CLIENT_SECRET'),
        };
      },
      inject: [ConfigService],
      imports: [TestRootModuleAsync],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
class TestRootModuleAsync {}

describe('AzureClientCredentialsModule', () => {
  describe('forRootAsync()', () => {
    it('should instantiate', async () => {
      jest.setTimeout(30000);
      process.env.APPLICATION_ID = ''; // replace with your client_id and uncomment lines 48-50
      process.env.TENANT_ID = ''; // replace with your tenant_id and uncomment lines 48-50
      process.env.CLIENT_SECRET = ''; // replace with your client_secret and uncomment lines 48-50
      const module =
        await NestFactory.createApplicationContext(TestRootModuleAsync);
      const service = module.get<AzureClientCredentialsService>(
        AzureClientCredentialsService,
      );
      expect(service).toBeDefined();
      // const response = await service.getClientCredentialsToken();
      // expect(response).toBeDefined();
      // expect(response.access_token).toBeDefined();
      await module.close();
    });
  });
});
