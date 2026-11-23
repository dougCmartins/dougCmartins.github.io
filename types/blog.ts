export type BlogBlock =
  | { type: 'paragraph', text: string }
  | { type: 'subheading', text: string }
  | { type: 'note', text: string }
  | { type: 'callout', text: string }
  | { type: 'code', text: string }
  | { type: 'list', items: string[] }
  | { type: 'flow', steps: string[] }
  | { type: 'table', rows: string[][] }

export type BlogSection = {
  label: string
  heading: string
  blocks: BlogBlock[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingMinutes: number
  tags: string[]
  linkedinUrl: string
  sections: BlogSection[]
}
