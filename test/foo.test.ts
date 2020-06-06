import { fooFn } from '../src';
import { expect } from 'chai';

describe('foo', () => {
  it(`fooFn`, () => {
    expect(fooFn).isFunction();
  });
  it(`foo`, () => {
    const f = 'foo';
    expect(f).to.equal('foo');
  });
});
