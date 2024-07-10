import nextMDX from '@next/mdx'
import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack: (config, { isServer }) => {
    // Directly modify the Babel loader configuration
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: {
        and: [/src/], // Adjust this to target your source files specifically
        not: [/node_modules\/react-highlight-words/]
      },
      use: config.module.rules.find(rule => rule.oneOf).oneOf.find(
        oneOfRule => oneOfRule.use && oneOfRule.use.loader && oneOfRule.use.loader.includes('next-babel-loader')
      ).use,
    });

    // Return the modified config
    return config;
  },
}

export default withSearch(withMDX(nextConfig))