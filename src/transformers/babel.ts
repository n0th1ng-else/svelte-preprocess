import { transformAsync } from '@babel/core';

import { Transformer, Options } from '../typings';

const transformer: Transformer<Options.Postcss> = async ({
  content,
  filename,
  options,
  map = undefined,
}) => {
  const { code } = await transformAsync(content, {
    filename,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    ...options,
  });
  const dependencies: string[] = [];

  return { code, map, dependencies };
};

export default transformer;
