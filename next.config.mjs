import dotenv from 'dotenv'
dotenv.config()

import nextMDX from '@next/mdx'

import remarkRehype from 'remark-rehype'
import remarkToc from "remark-toc"
import remarkOembed from "remark-oembed"
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkToc, {
        maxDepth: 2,
        tight: true,
        ordered: false
      }],
      remarkOembed,
      remarkRehype
    ],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

export default withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
