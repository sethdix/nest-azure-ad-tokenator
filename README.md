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

# TODO: update the commented out section with correct documentation

<!-- ## Register in AppModule

Register the SftpModule in your App Module.

This version uses forRootAsync

```typescript
import { SftpModule } from 'nest-sftp';

@Module({
  imports: [
    SftpModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => {
          return configService.getSftpConnectionInfo();
        },
        inject: [ConfigService],
        imports: [AppModule],
      },
      false,
    ),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
```

The Options object implements the ConnectConfig from ssh2.

```typescript
import { SftpModule } from 'nest-sftp';

@Module({
  imports: [
    SftpModule.forRoot(
      {
        host: 'fakehost.com',
        port: 22,
        username: 'fakeUser',
        password: '*****', // passwords should not contain \ (thy should be espaced like \\) and they cannot contain ! or (
      },
      false,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

With debug logging:

```typescript
import { SftpModule } from 'nest-sftp';

@Module({
  imports: [
    SftpModule.forRoot(
      {
        host: 'fakehost.com',
        port: 22,
        username: 'fakeUser',
        password: '*****', // passwords should not contain \ (thy should be espaced like \\) and they cannot contain ! or (
        debug: console.log, // adds logging for researching problems
      },
      false,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Dependency Inject Service

The SftpModule is global. The forRoot() method will open the connection as well during AppModule registration.
Then the SftpClientService can be injected into your class.

```typescript
import { SftpClientService } from 'nest-sftp';

export class AppService {
  private readonly logger: Logger;
  constructor(private readonly sftpClient: SftpClientService) {
    logger = new Logger();
  }

  async download(
    remotePath: string,
    localPath: string,
  ): Promise<string | NodeJS.ReadableStream | Buffer> {
    return await this.sftpClient.download(remotePath, localPath);
  }
  // change connection to a different user/password prior to upload
  async submit(
    remotePath: string,
    localPath: string,
    submitConfig: ConnectConfig,
  ): Promise<string | NodeJS.ReadableStream | Buffer> {
    await this.sftpClient.resetConnection(submitConfig);
    return await this.sftpClient.upload(remotePath, localPath);
  }
}
``` -->

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Seth Dix](mailto::sdix@lumeris.com)

## License

NEST Azure AD Tokenator is [MIT licensed](LICENSE).
