import { AzureClientCredentialsModuleParameters } from './azure-client-credentials-module-parameters';
import { AzureClientCredentialsResponse } from './azure-client-credentials-response.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureClientCredentialsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly azureClientCredentialsModuleParameters: AzureClientCredentialsModuleParameters,
  ) {}

  async getClientCredentialsToken() {
    const response = await this.httpService
      .post<AzureClientCredentialsResponse>(
        `https://login.microsoftonline.com/${this.azureClientCredentialsModuleParameters.tenantId}/oauth2/token`,
        JSON.stringify({
          grant_type: 'client_credentials',
          client_id: this.azureClientCredentialsModuleParameters.applicationId,
          client_secret:
            this.azureClientCredentialsModuleParameters.clientSecret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .toPromise();

    return response.data;
  }
}
