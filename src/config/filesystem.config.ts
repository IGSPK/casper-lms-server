import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DriverType, StorageModule } from '@codebrew/nestjs-storage';
export const MyStorageModule = StorageModule.forRoot({
  default: 'local',
  disks: {
    local: {
      driver: DriverType.LOCAL,
      config: {
        root: process.cwd(),
      },
    },
  },
});

export const MyServeStaticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '../../', 'public'),
  exclude: ['/api*'],
});
