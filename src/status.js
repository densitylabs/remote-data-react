import PropTypes from 'prop-types';

const ns = '@_RemoteData';
export const NOT_ASKED = `${ns}/NOT_ASKED`;
export const LOADING = `${ns}/LOADING`;
export const SUCCESS = `${ns}/SUCCESS`;
export const FAILURE = `${ns}/FAILURE`;

export const RemoteDataStatusPropType = PropTypes.oneOf([
  NOT_ASKED,
  LOADING,
  SUCCESS,
  FAILURE,
]);
