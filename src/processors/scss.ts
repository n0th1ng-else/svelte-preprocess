import { PreprocessorGroup, Options } from '../types';
import { parseFile } from '../modules/parseFile';
import { concat } from '../modules/concat';

export default (options?: Options.Sass): PreprocessorGroup => ({
  async style(svelteFile) {
    const { transformer } = await import('../transformers/scss');
    const {
      content,
      filename,
      attributes,
      lang,
      alias,
      dependencies,
    } = await parseFile(svelteFile, 'css');

    if (lang !== 'scss') return { code: content };

    if (alias === 'sass') {
      options = {
        ...options,
        indentedSyntax: true,
      };
    }

    const transformed = await transformer({
      content,
      filename,
      attributes,
      options,
    });

    return {
      ...transformed,
      dependencies: concat(dependencies, transformed.dependencies),
    };
  },
});
