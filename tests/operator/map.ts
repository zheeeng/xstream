import xs from '../../src/index';
import * as assert from 'assert';

describe('Stream.prototype.map', () => {
  it('should transform values from input stream to output stream', (done) => {
    const stream = xs.interval(100).map(i => 10 * i);
    const expected = [0, 10, 20];
    let observer = {
      next: (x: number) => {
        assert.equal(x, expected.shift());
        if (expected.length === 0) {
          stream.unsubscribe(observer);
          done();
        }
      },
      error: done.fail,
      complete: done.fail,
    };
    stream.subscribe(observer);
  });
});