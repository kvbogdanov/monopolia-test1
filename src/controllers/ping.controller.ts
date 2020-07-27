import {Application, CoreBindings, inject} from '@loopback/core';
import {get, Request, ResponseObject, RestBindings} from '@loopback/rest';
import {dynamicModelsDemo} from '../dynamic-models';


/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  //  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  localApp: any

  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
  ) {
    this.localApp = app;
  }

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  @get('/ping/build', {
    responses: {
      '200': {
        description: 'Test models assemble',
      },
    },
  })
  async build(): Promise<boolean> {
    return dynamicModelsDemo(this.localApp);
  }

}
