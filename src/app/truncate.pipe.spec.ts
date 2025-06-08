import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('should transform text', () => {
    const pipe = new TruncatePipe();

    const text = "This is a good test";
    expect(pipe.transform(text, 7)).toEqual('This is...');
  });
});
