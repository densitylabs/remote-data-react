import PropTypes from 'prop-types';

import {
  NOT_ASKED,
  LOADING,
  SUCCESS,
  FAILURE,
  RemoteDataStatusPropType,
} from './status';

const withStatus = remoteDataStatus => (body = null) => ({
  remoteDataStatus,
  body,
});

export const NotAsked = withStatus(NOT_ASKED);
export const Loading = withStatus(LOADING);
export const Success = withStatus(SUCCESS);
export const Failure = (cause = null) => ({
  remoteDataStatus: FAILURE,
  cause,
});

const checkStatus = status => model =>
  model && model.remoteDataStatus === status;

export const isNotAsked = checkStatus(NOT_ASKED);
export const isLoading = checkStatus(LOADING);
export const isSuccess = checkStatus(SUCCESS);
export const isFailure = checkStatus(FAILURE);

export const clone = model =>
  withStatus(model.remoteDataStatus)(unwrap(model));

export const unwrap = model =>
  model
    ? (isFailure(model) ? model.cause : model.body)
    : null;

export const merge = (model, updates) =>
  model
  ? (isSuccess(model) ? Success({...unwrap(model), ...updates}) : model)
  : null;

export const map = (model, f) =>
  model
  ? (isSuccess(model) ? Success(f(unwrap(model))) : model)
  : null;

export const join = (models = []) => {
  // TODO merge into a single loop with short circuit
  if (models.every(isSuccess)) {
    return Success(models.map(unwrap));
  }
  const failure = models.find(isFailure);
  if (failure) {
    return Failure(unwrap(failure));
  }
  if (models.some(isLoading)) {
    return Loading();
  }
  return NotAsked();
};

export const RemoteDataPropType = (BodyType = PropTypes.any) =>
  PropTypes.shape({
    remoteDataStatus: RemoteDataStatusPropType.isRequired,
    body: BodyType,
    cause: PropTypes.any,
  });

export const RemoteDataGenericPropType = PropTypes.shape({
  remoteDataStatus: RemoteDataStatusPropType.isRequired,
  body: PropTypes.any,
  cause: PropTypes.any,
});
