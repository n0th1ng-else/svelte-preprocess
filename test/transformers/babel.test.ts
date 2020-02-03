import { resolve } from 'path';

import getAutoPreprocess from '../../src';
import { preprocess } from '../utils';

describe('transformer - babel', () => {
  it('transpile with babel', async () => {
    const template = `<script>
    let foo = {}
    let bar = foo?.a?.b
    </script>`;
    const opts = getAutoPreprocess();
    const preprocessed = await preprocess(template, opts);
    expect(preprocessed.code).toContain(
      resolve(__dirname, '..', 'fixtures', 'style.less'),
    );
  });
});
