import { Options, PreprocessorGroup } from '../types';

export default (options?: Options.Pug): PreprocessorGroup => ({
  async markup({ content, filename }) {
    const { transformer } = await import('../transformers/pug');

    return transformer({ content, filename, options });
  },
});
