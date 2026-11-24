import { describe, expect, it } from 'vitest'
import { buildPost, extractSections, isPublished, parseCaption, parseQueue, slugFromFolder } from '~/scripts/blog-import/linkedin-source'

const queueMarkdown = `
## Sequência

| # | Data | Post (título do LinkedIn) | Status | Detalhe | Pasta |
|---|---|---|---|---|---|
| 1 | terça 17/11/2026 | A IA não lê palavras !! | **postado** | 17/11/2026 · https://www.linkedin.com/feed/update/urn:li:ugcPost:1/ | \`2026-11-17-tokens\` |
| 2 | terça 24/11/2026 | Tokens acabam !! | **aguardando fila** |  | \`2026-11-24-economia\` |
`

const postMarkdown = `# Post LinkedIn: Tokens

## Texto do post (colar junto com o PDF)

A IA não lê palavras, ela lê números !!

Como tokens e embeddings explicam o custo.

#InteligenciaArtificial #RAG

## Slides
1. Gancho
`

const carouselHtml = `<html><head><style>.x{}</style></head><body>
<section class="slide">
  <div class="top"><span class="tag">Conceito 1</span><span class="pill">⏱ 20s</span></div>
  <h2>Token é a <em>unidade</em></h2>
  <p class="lead">Não é palavra.</p>
  <div class="cols"><div class="card"><span class="num">1</span><h3>Divide</h3><p>Uma palavra.</p></div></div>
  <table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table>
  <pre><span class="k">Status:</span> aceito &lt; 1s</pre>
  <div class="wf"><div>Texto<small>prompt</small></div><i>→</i><div>Tokens<small>custo</small></div></div>
  <div class="alert">⚠️ <b>Dica:</b> seja direto.</div>
  <div class="foot"><span>Douglas</span></div>
</section>
</body></html>`

describe('parseQueue', () => {
  it('reads date, status, LinkedIn URL and folder of each row', () => {
    // Arrange
    const markdown = queueMarkdown

    // Act
    const queue = parseQueue(markdown)

    // Assert
    expect(queue).toHaveLength(2)
    expect(queue[0]).toEqual({
      date: '2026-11-17',
      title: 'A IA não lê palavras !!',
      status: 'postado',
      linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:1/',
      folder: '2026-11-17-tokens',
    })
  })
})

describe('isPublished', () => {
  it('accepts a posted queue entry', () => {
    // Arrange
    const [entry] = parseQueue(queueMarkdown)

    // Act
    const published = isPublished(entry, false)

    // Assert
    expect(published).toBe(true)
  })

  it('rejects a queued entry without PUBLICADO.txt', () => {
    // Arrange
    const [, entry] = parseQueue(queueMarkdown)

    // Act
    const published = isPublished(entry, false)

    // Assert
    expect(published).toBe(false)
  })

  it('accepts any entry whose folder has PUBLICADO.txt', () => {
    // Arrange
    const [, entry] = parseQueue(queueMarkdown)

    // Act
    const published = isPublished(entry, true)

    // Assert
    expect(published).toBe(true)
  })
})

describe('parseCaption', () => {
  it('splits the post text into title, intro and hashtags', () => {
    // Arrange
    const markdown = postMarkdown

    // Act
    const caption = parseCaption(markdown)

    // Assert
    expect(caption).toEqual({
      title: 'A IA não lê palavras, ela lê números !!',
      excerpt: 'Como tokens e embeddings explicam o custo.',
      tags: ['InteligenciaArtificial', 'RAG'],
    })
  })
})

describe('slugFromFolder', () => {
  it('drops the date prefix', () => {
    // Arrange
    const folder = '2026-11-17-tokens-e-embeddings'

    // Act
    const slug = slugFromFolder(folder)

    // Assert
    expect(slug).toBe('tokens-e-embeddings')
  })
})

describe('extractSections', () => {
  it('keeps the slide text as article blocks and skips the slide chrome', () => {
    // Arrange
    const html = carouselHtml

    // Act
    const [section] = extractSections(html)

    // Assert
    expect(section.label).toBe('Conceito 1')
    expect(section.heading).toBe('Token é a unidade')
    expect(section.blocks).toEqual([
      { type: 'paragraph', text: 'Não é palavra.' },
      { type: 'subheading', text: 'Divide' },
      { type: 'paragraph', text: 'Uma palavra.' },
      { type: 'table', rows: [['A', 'B'], ['1', '2']] },
      { type: 'code', text: 'Status: aceito < 1s' },
      { type: 'flow', steps: ['Texto (prompt)', 'Tokens (custo)'] },
      { type: 'callout', text: '⚠️ Dica: seja direto.' },
    ])
  })
})

describe('extractSections spacing', () => {
  it('keeps a space between adjacent inline elements', () => {
    // Arrange
    const html = '<body><section class="slide"><h2>T</h2><div class="agent"><span><b>Buscar</b> · arquivos</span><span class="m">modelo leve</span></div></section></body>'

    // Act
    const [section] = extractSections(html)

    // Assert
    expect(section.blocks).toEqual([{ type: 'paragraph', text: 'Buscar · arquivos modelo leve' }])
  })
})

describe('buildPost', () => {
  it('combines the queue entry, caption and slides into a blog post', () => {
    // Arrange
    const [entry] = parseQueue(queueMarkdown)

    // Act
    const post = buildPost(entry, postMarkdown, carouselHtml)

    // Assert
    expect(post.slug).toBe('tokens')
    expect(post.title).toBe('A IA não lê palavras, ela lê números !!')
    expect(post.date).toBe('2026-11-17')
    expect(post.readingMinutes).toBe(1)
    expect(post.sections).toHaveLength(1)
  })
})
