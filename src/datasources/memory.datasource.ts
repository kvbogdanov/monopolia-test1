import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: "memory",
  connector: "memory",
  file: "mydata.json",
};

@lifeCycleObserver('datasource')
export class MemoryDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'memory';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.memory', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
