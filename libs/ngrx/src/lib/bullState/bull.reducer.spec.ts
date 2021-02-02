import { bullReducer, initialBullState } from './bull.reducer';

describe('Bull Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = bullReducer(initialBullState, action);

      expect(result).toBe(initialBullState);
    });
  });
});
