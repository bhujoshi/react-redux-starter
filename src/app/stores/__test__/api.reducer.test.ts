import createApiReducer, { API_STATE } from '../api.reducer';

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
  
});
