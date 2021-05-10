<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="./resources/nestjs.png" /><img src="./resources/azure-ad.png" /></a>
</p>

# NEST Azure AD Tokenator

## Description

[Nest Framework](https://github.com/nestjs/nest) modules for requesting tokens from [Azure AD](https://azure.microsoft.com/en-us/services/active-directory/) based on scope (service requests vs user requests)

Scaffolded from [nest-sftp](https://github.com/benMain/nest-sftp) (Nest framework module wrapper around [ssh2-sftp-client](https://github.com/theophilusx/ssh2-sftp-client)).

## Installation

```bash
$ npm install --save nest-azure-ad-tokenator
```

## Register in AppModule

Register the AzureClientCredentialsModule in your App Module.

This version uses forRootAsync

```typescript
import { AzureClientCredentialsModule } from 'nest-azure-ad-tokenator';

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
      imports: [AppModule],
    }),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
```

## Usage

```typescript
export class AuthClient {
  constructor(
    private readonly azureClientCredentialsService: AzureClientCredentialsService,
  ) {}

  async getToken() {
    return await this.azureClientCredentialsService.getClientCredentialsToken();
  }
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Seth Dix](mailto:sdix@lumeris.com)

## License

NEST Azure AD Tokenator is [MIT licensed](LICENSE).
