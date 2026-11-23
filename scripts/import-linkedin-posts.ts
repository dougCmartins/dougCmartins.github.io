/**
 * Imports published LinkedIn posts into content/blog/<slug>.json.
 *
 * Usage: node scripts/import-linkedin-posts.ts "<path to Posts LinkedIn folder>"
 *
 * Only queue entries marked as published (status "postado" in FILA.md or a PUBLICADO.txt
 * file in the post folder) are imported. Existing posts are overwritten with the latest text
 * and never deleted.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { buildPost, isPublished, parseQueue } from './blog-import/linkedin-source.ts'

const sourceDir = resolve(process.argv[2] ?? process.env.LINKEDIN_POSTS_DIR ?? '')
const outputDir = resolve(import.meta.dirname, '../content/blog')

if (!existsSync(join(sourceDir, 'FILA.md'))) {
  console.error(`FILA.md not found in "${sourceDir}". Pass the "Posts LinkedIn" folder as the first argument.`)
  process.exit(1)
}

mkdirSync(outputDir, { recursive: true })

const queue = parseQueue(readFileSync(join(sourceDir, 'FILA.md'), 'utf8'))
const report = { imported: [] as string[], skipped: [] as string[] }

for (const entry of queue) {
  const folder = join(sourceDir, entry.folder)
  const published = isPublished(entry, existsSync(join(folder, 'PUBLICADO.txt')))
  const markdownFile = existsSync(folder) ? readdirSync(folder).find(name => /^post-.*\.md$/.test(name)) : undefined
  const carouselFile = join(folder, 'carrossel.html')

  if (!published || !markdownFile || !existsSync(carouselFile)) {
    report.skipped.push(`${entry.folder} (${published ? 'missing post-*.md or carrossel.html' : entry.status})`)
    continue
  }

  const post = buildPost(entry, readFileSync(join(folder, markdownFile), 'utf8'), readFileSync(carouselFile, 'utf8'))
  writeFileSync(join(outputDir, `${post.slug}.json`), `${JSON.stringify(post, null, 2)}\n`)
  report.imported.push(`${post.slug} (${post.date})`)
}

console.log(JSON.stringify(report, null, 2))
