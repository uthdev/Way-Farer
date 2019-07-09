import Validator from 'validatorjs';
import customErrorMsgs from './customErrorMsgs';
import { errorResponse } from './responses';

export const validate = async (res, next, data,  properties) => {
  const validator = new Validator(data, properties, customErrorMsgs);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return errorResponse(res, 400, errors)
    });
}