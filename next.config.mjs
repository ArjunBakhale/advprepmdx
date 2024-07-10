import nextMDX from '@next/mdx';
import withSearch from './src/mdx/search.mjs';
import { recmaPlugins } from './src/mdx/recma.mjs';
import { rehypePlugins } from './src/mdx/rehype.mjs';
import { remarkPlugins } from './src/mdx/remark.mjs';

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack: (config, { isServer }) => {
    // Directly modify the Babel loader configuration
    const babelRule = config.module.rules.find(
      rule =>
        rule.test && rule.test.toString().includes('js|jsx|ts|tsx') && rule.use && rule.use.loader && rule.use.loader.includes('next-babel-loader')
    );

    if (babelRule) {
      babelRule.exclude = /node_modules\/react-highlight-words/;
    }

    // Return the modified config
    return config;
  },
};

export default withSearch(withMDX(nextConfig));
