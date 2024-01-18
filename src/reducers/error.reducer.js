const initialState = {};

export default (state = initialState, { type, payload }) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'FAIL') {
    return {
      ...state,
      [actionName]: payload,
    };
  }

  const { [actionName]: a, ...props } = state;
  return props;
};
