// import Joi from '@hapi/joi';
// import tv4 from 'tv4';
import chai from 'chai';
import { TVariable } from '@firecamp/types';
import { _misc, _string } from '@firecamp/utils';
import { Request } from './request';
import { Response } from './response';
import { Variables } from './variables';

export default class Fc implements IFc {
  request;
  response;
  globals: Variables;
  environment: Variables;
  collectionVariables: Variables;
  constructor(
    request,
    response,
    globalVars: TVariable[] = [],
    envVars: TVariable[] = [],
    collectionVars: TVariable[] = []
  ) {
    this.request = new Request(request);
    this.response = new Response(response);
    this.globals = new Variables(globalVars);
    this.environment = new Variables(envVars);
    this.collectionVariables = new Variables(collectionVars);
  }
  public variables = {
    get: (variableName: string) => {
      /**
       * variable find priorities
       * 1. first find in collection variables
       * 2. if not found then find in environment variables
       * 3. if not found then find in globals variables
       */
      let value = this.collectionVariables.get(variableName);
      if (value === undefined) {
        value = this.environment.get(variableName);
      } else {
        value = this.globals.get(variableName);
      }
      return value;
    },
  };
  public test = (testName: string, specFunction: Function) => {};
  public expect = chai.expect;

  public toJSON() {
    return {
      request: this.request.toJSON(),
      response: this.response.toJSON(),
      globals: this.globals.toJSON(),
      environment: this.environment.toJSON(),
      collectionVariables: this.collectionVariables.toJSON(),
    };
  }
}

interface IFc {
  request: any;
  response: any;
  variables: any;
  collectionVariables: Variables;
  globals: Variables;
  test: (testName: string, specFunction: Function) => void;
  expect: Chai.ExpectStatic;
}
