import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureClientCredentialsModuleParameters {
  tenantId: string;
  applicationId: string;
  clientSecret: string;
}
