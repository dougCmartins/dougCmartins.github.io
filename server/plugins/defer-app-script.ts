const moduleScriptPattern = /<script type="module" src="(\/_nuxt\/[^"]+\.js)" crossorigin><\/script>/
const earlyScriptLinkPattern = /<link rel="(?:modulepreload|prefetch)"[^>]*>/g

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    let entry = ''

    html.head = html.head.map((chunk) => {
      const match = chunk.match(moduleScriptPattern)
      if (match?.[1]) {
        entry = match[1]
        chunk = chunk.replace(moduleScriptPattern, '')
      }
      return chunk.replace(earlyScriptLinkPattern, '')
    })

    if (!entry) {
      return
    }

    html.bodyAppend.push(`<script>
(function () {
  var started = false
  function start() {
    if (started) return
    started = true
    var script = document.createElement('script')
    script.type = 'module'
    script.src = '${entry}'
    script.crossOrigin = 'anonymous'
    document.body.appendChild(script)
  }
  document.fonts.ready.then(start)
  setTimeout(start, 3000)
})()
</script>`)
  })
})
