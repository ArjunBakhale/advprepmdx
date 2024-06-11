import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const AssistantMessage = ({ m }) => {
  console.log(m)

  return (
    <ReactMarkdown
      className="max-w-80 prose break-words dark:prose-invert prose-p:leading-relaxed  prose-pre:p-0"
      remarkPlugins={[remarkMath]}
      components={{
        // Syntax highlighting for code blocks
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={coldarkDark}
              language={match[1]}
              customStyle={{
                maxWidth: '320px',
                fontSize: '0.65rem',
                borderRadius: '0.375rem',
              }}
              wrapLines={true}
              PreTag="div"
              {...props}
            >
              {children}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        // Custom paragraph rendering
        p({ node, children, ...props }) {
          return (
            <p className="text-sm text-gray-900 dark:text-white" {...props}>
              {children}
            </p>
          )
        },
        // Render tables
        table: ({ children }) => (
          <table className="min-w-full divide-y divide-gray-200">
            {children}
          </table>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-200 bg-white">
            {children}
          </tbody>
        ),
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => (
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="whitespace-nowrap px-6 py-4">{children}</td>
        ),
        // Render bullet lists
        ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
        // Render ordered lists
        ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
        // Render list items
        li: ({ children }) => <li>{children}</li>,
        // Render blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
            {children}
          </blockquote>
        ),
        // Add other custom renderers as needed
      }}
    >
      {m.content}
    </ReactMarkdown>
  )
}
