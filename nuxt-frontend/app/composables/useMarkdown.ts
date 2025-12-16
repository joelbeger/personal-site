import { marked } from 'marked'

export const useMarkdown = () => {
  // Configure marked to add target="_blank" to links
  const renderer = new marked.Renderer()
  
  renderer.link = ({ href, title, text }) => {
    // Add target="_blank" and rel="noopener noreferrer" for external links
    if (href?.startsWith('http')) {
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`
    }
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}"${titleAttr}>${text}</a>`
  }
  
  marked.setOptions({ renderer })

  const parseMarkdown = (markdown: string | undefined) => {
    if (!markdown) return ''
    return marked(markdown)
  }

  return {
    parseMarkdown
  }
}