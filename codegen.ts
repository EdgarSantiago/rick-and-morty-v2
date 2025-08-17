import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/app/**/*.tsx', 'src/lib/**/*.ts', 'src/lib/**/*.tsx'],
  generates: {
    './src/lib/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  // Enable if Prettier is installed locally
  // hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
