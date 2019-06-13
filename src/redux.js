import RemoteData from './index';

import { identity } from 'lodash';

const dispatchAdditionalActions = (dispatch, actions = []) =>
  actions.forEach(action => dispatch(action));

export function dispatchPromise({
  dispatch,
  promise,
  actionType,
  actionBuilder: actionBuilderParam,
  mapSuccess = identity,
  mapFailure = identity,
  additionalSuccessActions = [],
  additionalFailureActions = [],
}) {
  const actionBuilder = actionBuilderParam || (payload => ({ type: actionType, payload }));
  dispatch(actionBuilder(RemoteData.Loading()));
  return promise
    .then(
      success => {
        const res = mapSuccess(success);
        dispatch(actionBuilder(RemoteData.Success(res)));
        dispatchAdditionalActions(dispatch, additionalSuccessActions);
        return res;
      },
      failure => {
        const err = mapFailure(failure);
        dispatch(actionBuilder(RemoteData.Failure(err)));
        dispatchAdditionalActions(dispatch, additionalFailureActions);
        throw err;
      }
    );
}
