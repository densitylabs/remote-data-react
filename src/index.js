import * as Model from './model';

import RemoteDataCase from './RemoteDataCase';

const RemoteData = {
  ...Model,
  PropType: Model.RemoteDataPropType,
  Case: RemoteDataCase,
};

export default RemoteData;
