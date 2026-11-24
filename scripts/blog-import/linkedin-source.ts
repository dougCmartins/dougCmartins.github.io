import { parse, NodeType, type HTMLElement, type Node } from 'node-html-parser'
import type { BlogBlock, BlogPost, BlogSection } from '../../types/blog.ts'

export type QueueEntry = {
  date: string
  title: string
  status: string
  linkedinUrl: string
  folder: string
}

export type PostCaption = {
  title: string
  excerpt: string
  tags: string[]
}

const WORDS_PER_MINUTE = 200
const PUBLISHED_STATUSES = ['postado', 'publicado']
const SKIPPED_CLASSES = ['top', 'foot', 'chips', 'badge', 'num', 'pill', 'next', 'tag']
const CALLOUT_CLASSES = ['alert', 'tip', 'res']
const NOTE_CLASSES = ['q', 'big', 'ex', 'note']
const BLOCK_TAGS = new Set(['div', 'p', 'ul', 'ol', 'table', 'pre', 'h1', 'h2', 'h3', 'h4', 'section'])

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

/** Element text with a space between sibling elements that have no whitespace between them. */
function spacedText(element: HTMLElement): string {
  let previousWasElement = false
  return element.childNodes.map((node) => {
    if (!isElement(node)) {
      previousWasElement = false
      return node.text
    }
    const text = spacedText(node)
    const separator = previousWasElement ? ' ' : ''
    previousWasElement = true
    return separator + text
  }).join('')
}

function toIsoDate(value: string): string {
  const match = value.match(/(\d{2})\/(\d{2})\/(\d{4})/)
  return match ? `${match[3]}-${match[2]}-${match[1]}` : ''
}

/** Reads the "Sequência" table of FILA.md (one row per scheduled LinkedIn post). */
export function parseQueue(markdown: string): QueueEntry[] {
  return markdown
    .split('\n')
    .filter(line => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => {
      const cells = line.split('|').slice(1, -1).map(cell => cell.trim())
      const [, date = '', title = '', status = '', detail = '', folder = ''] = cells
      return {
        date: toIsoDate(date),
        title,
        status: status.replace(/\*/g, '').trim(),
        linkedinUrl: detail.match(/https:\/\/\S+/)?.[0] ?? '',
        folder: folder.replace(/`/g, '').trim(),
      }
    })
}

export function isPublished(entry: QueueEntry, hasPublishedMarker: boolean): boolean {
  return hasPublishedMarker || PUBLISHED_STATUSES.some(status => entry.status.toLowerCase().includes(status))
}

/** Reads the "## Texto do post" section: title line, intro lines and the hashtag line. */
export function parseCaption(markdown: string): PostCaption {
  const section = markdown.split(/^## Texto do post.*$/m)[1]?.split(/^## /m)[0] ?? ''
  const lines = section.split('\n').map(line => line.trim()).filter(Boolean)
  const tagLine = lines.find(line => line.startsWith('#')) ?? ''
  const textLines = lines.filter(line => line !== tagLine)

  return {
    title: textLines[0] ?? '',
    excerpt: textLines.slice(1).join(' '),
    tags: tagLine.split(/\s+/).filter(tag => tag.startsWith('#')).map(tag => tag.slice(1)),
  }
}

export function slugFromFolder(folder: string): string {
  return folder.replace(/^(publicado-)?\d{4}-\d{2}-\d{2}-/, '')
}

function hasClass(element: HTMLElement, names: string[]): boolean {
  return names.some(name => element.classList.contains(name))
}

function isElement(node: Node): node is HTMLElement {
  return node.nodeType === NodeType.ELEMENT_NODE
}

function isLeaf(element: HTMLElement): boolean {
  return !element.querySelectorAll('*').some(child => BLOCK_TAGS.has(child.tagName.toLowerCase()))
}

function flowStep(element: HTMLElement): string {
  const hint = element.querySelector('small')
  const main = cleanText(hint ? element.text.replace(hint.text, '') : element.text)
  return hint ? `${main} (${cleanText(hint.text)})` : main
}

function labelledItem(element: HTMLElement): string {
  const label = element.querySelector('b, strong')
  const rest = cleanText(label ? element.text.replace(label.text, '') : element.text)
  return label ? `${cleanText(label.text)} — ${rest}` : rest
}

function isLabelledList(element: HTMLElement): boolean {
  const children = element.childNodes.filter(isElement)
  return children.length >= 3 && children.every(child => child.tagName === 'DIV' && isLeaf(child) && child.querySelector('b, strong'))
}

function pushFlow(blocks: BlogBlock[], steps: string[]): void {
  const previous = blocks[blocks.length - 1]
  if (previous?.type === 'flow') {
    previous.steps.push(...steps)
    return
  }
  blocks.push({ type: 'flow', steps })
}

function collectBlocks(element: HTMLElement, section: BlogSection): void {
  for (const child of element.childNodes.filter(isElement)) {
    const tag = child.tagName.toLowerCase()
    const text = cleanText(spacedText(child))

    if (hasClass(child, SKIPPED_CLASSES) || tag === 'colgroup' || !text) continue

    if (tag === 'h1' || tag === 'h2') {
      if (section.heading) section.blocks.push({ type: 'subheading', text })
      else section.heading = text
    }
    else if (tag === 'h3' || tag === 'h4') section.blocks.push({ type: 'subheading', text })
    else if (tag === 'p') section.blocks.push({ type: 'paragraph', text })
    else if (tag === 'pre') section.blocks.push({ type: 'code', text: child.text.replace(/^\n+|\s+$/g, '') })
    else if (tag === 'ul' || tag === 'ol') section.blocks.push({ type: 'list', items: child.querySelectorAll('li').map(item => cleanText(item.text)) })
    else if (tag === 'table') {
      section.blocks.push({ type: 'table', rows: child.querySelectorAll('tr').map(row => row.querySelectorAll('th, td').map(cell => cleanText(cell.text))) })
    }
    else if (hasClass(child, CALLOUT_CLASSES)) section.blocks.push({ type: 'callout', text })
    else if (hasClass(child, ['formula'])) section.blocks.push({ type: 'code', text })
    else if (hasClass(child, NOTE_CLASSES)) section.blocks.push({ type: 'note', text })
    else if (hasClass(child, ['tok'])) section.blocks.push({ type: 'note', text: child.querySelectorAll('span').map(span => span.text.trim()).join(' | ') })
    else if (hasClass(child, ['wf'])) pushFlow(section.blocks, child.childNodes.filter(isElement).filter(step => step.tagName === 'DIV').map(flowStep))
    else if (hasClass(child, ['flow'])) pushFlow(section.blocks, child.querySelectorAll('span').map(span => cleanText(span.text)))
    else if (isLabelledList(child)) section.blocks.push({ type: 'list', items: child.childNodes.filter(isElement).map(labelledItem) })
    else if (isLeaf(child)) {
      const isTitle = /font-weight:\s*700/.test(child.getAttribute('style') ?? '')
      section.blocks.push({ type: isTitle ? 'subheading' : 'paragraph', text })
    }
    else collectBlocks(child, section)
  }
}

/** Turns each carousel slide (<section class="slide">) into an article section with the same text. */
export function extractSections(carouselHtml: string): BlogSection[] {
  const body = carouselHtml.replace(/<br\s*\/?>/gi, ' ')
  const root = parse(body.slice(body.indexOf('<body')), { blockTextElements: {} })

  return root.querySelectorAll('section.slide').map((slide) => {
    const section: BlogSection = {
      label: cleanText(slide.querySelector('.top .tag')?.text ?? ''),
      heading: '',
      blocks: [],
    }
    collectBlocks(slide, section)
    return section
  })
}

function sectionText(section: BlogSection): string {
  const blockText = section.blocks.map((block) => {
    if (block.type === 'list') return block.items.join(' ')
    if (block.type === 'flow') return block.steps.join(' ')
    if (block.type === 'table') return block.rows.flat().join(' ')
    return block.text
  })
  return [section.heading, ...blockText].join(' ')
}

export function readingMinutes(post: Pick<BlogPost, 'excerpt' | 'sections'>): number {
  const words = [post.excerpt, ...post.sections.map(sectionText)].join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

export function buildPost(entry: QueueEntry, postMarkdown: string, carouselHtml: string): BlogPost {
  const caption = parseCaption(postMarkdown)
  const sections = extractSections(carouselHtml)

  return {
    slug: slugFromFolder(entry.folder),
    title: caption.title || entry.title,
    excerpt: caption.excerpt,
    date: entry.date,
    readingMinutes: readingMinutes({ excerpt: caption.excerpt, sections }),
    tags: caption.tags,
    linkedinUrl: entry.linkedinUrl,
    sections,
  }
}
