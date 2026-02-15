const ieee754 = require('./index');

describe('validation behavior', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('getPrecision validation', () => {
    test('undefined value returns undefined and logs error', () => {
      expect(ieee754.getPrecision(undefined, {mode: 'half'})).toBeUndefined();
      /*
       * undefined triggers the second validation branch (not-a-number check)
       * so the message mentions "type of number" rather than "defined".
       */
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('number')})
      );
    });

    test('non-number value logs type error', () => {
      expect(ieee754.getPrecision('foo', {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('type of number')})
      );
    });

    test('invalid mode option logs mode error', () => {
      expect(ieee754.getPrecision(1.23, {mode: 'quad'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Mode option must')}));
    });

    test('invalid returnType option logs returnType error', () => {
      expect(ieee754.getPrecision(1.23, {mode: 'half', returnType: 'foo'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Returntype option')}));
    });
  });

  describe('getDecimal validation', () => {
    test('undefined value returns undefined and logs error', () => {
      expect(ieee754.getDecimal(undefined, {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Value must be defined')}));
    });

    test('value with no length logs length error', () => {
      expect(ieee754.getDecimal([], {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('must have length')})
      );
    });

    test('value of wrong type logs length-or-type error', () => {
      // passing a primitive other than 0 triggers the length check first
      expect(ieee754.getDecimal(123, {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('must have length')})
      );
    });

    test('invalid mode option logs mode error', () => {
      expect(ieee754.getDecimal([1,2,3], {mode: 'quad'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Mode option must')}));
    });
  });
});
