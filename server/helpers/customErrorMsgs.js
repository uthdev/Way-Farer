const customErrorMessages = {
  numeric: ':attribute should contain only numbers.',
  digits: ':attribute should be :digits digits long.',
  min: ':attribute should not be less than :min.',
  max: ':attribute should not be more than :max.',
  required: ':attribute is required',
  email: ':attribute should be a valid email address',
  alpha_dash: ':attribute should contain only aphabets, numbers, underscores and dashes',
  alpha: ':attribute should contain only letters.',
  boolean: ':attribute should be boolean: true or false.',
  in: ':attribute should be :in.',
  string: ':attribute should be of of string type',
  after: ':attribute must be after :after',
};

export default customErrorMessages;
