import createApiReducer, { API_STATE } from './api.reducer';

describe('Api reducer basic test', () => {
  const reducerName = 'test';
  const initData: any[] = [];
  const testApiReducer = createApiReducer(reducerName, initData);

  it('should match reducer name ', () => {
    expect(testApiReducer.name).toBe(reducerName);
  });
  it('should contain Init action ', () => {
    expect(Object.keys(testApiReducer.actions)).toContain(reducerName + 'Init');
  });
  it('should contain Loading action ', () => {
    expect(Object.keys(testApiReducer.actions)).toContain(
      reducerName + 'Loading',
    );
  });
  it('should contain Loaded action ', () => {
    expect(Object.keys(testApiReducer.actions)).toContain(
      reducerName + 'Loaded',
    );
  });
  it('should contain Error action ', () => {
    expect(Object.keys(testApiReducer.actions)).toContain(
      reducerName + 'Error',
    );
  });
  it('should contain Failed action ', () => {
    expect(Object.keys(testApiReducer.actions)).toContain(
      reducerName + 'Failed',
    );
  });
  const initState = {
    apiState: API_STATE.INIT,
    data: initData,
    error: '',
  };
  let currentState = { ...initState };
  const { reducer, actions } = testApiReducer;

  it('should match failed state', () => {
    const failedState = 'test error!';
    const preState = { ...currentState };
    currentState = reducer(initState, actions.testFailed(failedState));
    expect(currentState).toEqual({
      ...preState,
      apiState: API_STATE.FAILED,
      error: failedState,
    });
  });

  it('should match error state', () => {
    const errorState = 'test error!';
    const preState = { ...currentState };
    currentState = reducer(initState, actions.testError(errorState));

    expect(currentState).toEqual({
      ...preState,
      apiState: API_STATE.ERROR,
      error: errorState,
    });
  });

  it('should match should match loaded state', () => {
    const apiData = ['a', 'b', 'c'];
    currentState = reducer(initState, actions.testLoaded(apiData));
    expect(currentState).toEqual({
      apiState: API_STATE.LOADED,
      data: apiData,
      error: '',
    });
  });

  it('should match loading state', () => {
    const preState = {};
    currentState = reducer(initState, actions.testLoading(null));
    expect(currentState).toEqual({
      ...preState,
      apiState: API_STATE.LOADING,
    });
  });

  it('should match init state', () => {
    currentState = reducer(initState, actions.testInit(null));
    expect(currentState).toEqual(initState);
  });
});
