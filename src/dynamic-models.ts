import {inject} from '@loopback/core';
import {
  defineCrudRepositoryClass,
  defineModelClass,
  Entity,
  ModelDefinition
} from '@loopback/repository';
import {defineCrudRestController} from '@loopback/rest-crud';


export async function dynamicModelsDemo(app: any): Promise<boolean> {

  // assume that this def can be created dynamically (at runtime), e.g. from database info
  const bookDef = new ModelDefinition({
    name: 'book',
    properties: {
      id: {
        type: 'Number',
        required: true,
        length: null,
        precision: 10,
        scale: 0,
        id: 1,
      },
      title: {
        type: 'String',
        required: false,
        length: 512,
        precision: null,
        scale: null,
      },
    },
  });

  // tryin' to extend Entity with new fields
  const BookModel = defineModelClass<typeof Entity, {id: number; title?: string}>(
    Entity,
    bookDef,
  );

  const BookRepository = defineCrudRepositoryClass(BookModel);

  inject(`datasources.memory`)(BookRepository, undefined, 0);
  const repoBinding = app.repository(BookRepository);

  const basePath = '/booktest';

  const DynamicController0 = defineCrudRestController(BookModel, {basePath});
  inject(repoBinding.key)(DynamicController0, undefined, 0);
  app.controller(DynamicController0);

  console.log(basePath);

  return new Promise(function (resolve, reject) {
    resolve(true);
  });
}
