import Queue from '../src/index';

jest.useFakeTimers();

describe('Queue', () => {
  it('should execute added functions every 5s by default', () => {
    const queue = new Queue();
    const func1 = jest.fn();
    const func2 = jest.fn();

    queue.add(func1);
    queue.add(func2);

    expect(func1).not.toHaveBeenCalled();
    expect(func2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5000);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2500);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2500);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
  });

  it('should execute added functions at a custom wait time, if specified', () => {
    const queue = new Queue(2000);
    const func1 = jest.fn();
    const func2 = jest.fn();

    queue.add(func1);
    queue.add(func2);

    expect(func1).not.toHaveBeenCalled();
    expect(func2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
  });

  it('should execute given callbacks if provided', () => {
    const queue = new Queue(2000);
    const func1 = jest.fn(() => 'mock-result');
    const callback = jest.fn();
    queue.add(func1, callback);
    jest.runAllTimers();

    expect(func1).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('mock-result');
  });
});
