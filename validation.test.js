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
    test('Should return undefined and log error when value is undefined', () => {
      expect(ieee754.getPrecision(undefined, {mode: 'half'})).toBeUndefined();
      /*
       * undefined triggers the second validation branch (not-a-number check)
       * so the message mentions "type of number" rather than "defined".
       */
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('number')})
      );
    });

    test('Should return undefined and log type error when value is not a number', () => {
      expect(ieee754.getPrecision('foo', {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('type of number')})
      );
    });

    test('Should return undefined and log mode error when mode is invalid', () => {
      expect(ieee754.getPrecision(1.23, {mode: 'quad'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Mode option must')}));
    });

    test('Should return undefined and log returnType error when returnType is invalid', () => {
      expect(ieee754.getPrecision(1.23, {mode: 'half', returnType: 'foo'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Returntype option')}));
    });
  });

  describe('getDecimal validation', () => {
    test('Should return undefined and log error when value is undefined', () => {
      expect(ieee754.getDecimal(undefined, {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Value must be defined')}));
    });

    test('Should return undefined and log length error when value has no length', () => {
      expect(ieee754.getDecimal([], {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('must have length')})
      );
    });

    test('Should return undefined and log length-or-type error when value is wrong type', () => {
      // passing a primitive other than 0 triggers the length check first
      expect(ieee754.getDecimal(123, {mode: 'half'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(
        expect.objectContaining({message: expect.stringContaining('must have length')})
      );
    });

    test('Should return undefined and log mode error when mode is invalid', () => {
      expect(ieee754.getDecimal([1,2,3], {mode: 'quad'})).toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith(expect.objectContaining({message: expect.stringContaining('Mode option must')}));
    });
  });
});
