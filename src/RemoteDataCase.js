import PropTypes from 'prop-types';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';

import {
  isNotAsked,
  isLoading,
  isSuccess,
  isFailure,
  unwrap,
  RemoteDataGenericPropType,
} from './model';

const stubNull = () => null;

const RemoteDataCase = ({
  model = {},
  defaults = stubNull,
  notAsked = defaults,
  loading = defaults,
  success = defaults,
  failure = defaults,
}) => {
  const withModel = fn => () => fn(unwrap(model));

  return cond([
    [isNotAsked, withModel(notAsked)],
    [isLoading, withModel(loading)],
    [isSuccess, withModel(success)],
    [isFailure, withModel(failure)],
    [stubTrue, defaults],
  ])(model);
};

RemoteDataCase.propTypes = {
  model: RemoteDataGenericPropType.isRequired,
  defaults: PropTypes.func,
  notAsked: PropTypes.func,
  loading: PropTypes.func,
  success: PropTypes.func,
  failure: PropTypes.func,
};

export default RemoteDataCase;
