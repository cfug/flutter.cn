import { describe, it } from 'mocha';
import { expect } from 'chai';
import { postprocess } from './postprocessor';

describe('postprocessor', function () {
  it('should exchange dom', () => {
    expect(postprocess(`<html><head></head><body><p>a</p><p>one</p><p>一</p></body></html>`)).eql(`<html><head></head><body><p>a</p><p translation-result="on">一</p><p translation-origin="off">one</p></body></html>`);
  });
});
