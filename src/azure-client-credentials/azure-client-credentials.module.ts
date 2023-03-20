import { AsyncProvider, ImportableFactoryProvider } from './async-types';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { AzureClientCredentialsModuleParameters } from './azure-client-credentials-module-parameters';
import { AzureClientCredentialsService } from './azure-client-credentials.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    AzureClientCredentialsService,
    AzureClientCredentialsModuleParameters,
  ],
  exports: [AzureClientCredentialsService],
})
export class AzureClientCredentialsModule {
  static forRoot(
    azureClientCredentialsModuleParameters: AzureClientCredentialsModuleParameters,
  ): DynamicModule {
    return {
      imports: [HttpModule],
      module: AzureClientCredentialsModule,
      providers: [
        AzureClientCredentialsService,
        {
          provide: AzureClientCredentialsModuleParameters,
          useValue: azureClientCredentialsModuleParameters,
        },
      ],
      exports: [AzureClientCredentialsService],
    };
  }

  static forRootAsync(
    azureClientCredentialsModuleParameters: AsyncProvider<
      | AzureClientCredentialsModuleParameters
      | Promise<AzureClientCredentialsModuleParameters>
    >,
  ): DynamicModule {
    const module: DynamicModule = {
      imports: [HttpModule],
      module: AzureClientCredentialsModule,
      providers: [AzureClientCredentialsService],
      exports: [AzureClientCredentialsService],
    };

    this.addAsyncProvider<AzureClientCredentialsModuleParameters>(
      module,
      azureClientCredentialsModuleParameters,
    );
    return module;
  }

  private static addAsyncProvider<T>(
    module: DynamicModule,
    asyncProvider: AsyncProvider<T | Promise<T>>,
  ) {
    const imports = (asyncProvider as ImportableFactoryProvider<T>).imports;
    if (imports?.length) {
      imports.forEach((i) => module.imports.push(i));
    }
    delete (asyncProvider as ImportableFactoryProvider<T>).imports;

    module.providers.push({
      ...asyncProvider,
      provide: AzureClientCredentialsModuleParameters,
    });
  }
}
