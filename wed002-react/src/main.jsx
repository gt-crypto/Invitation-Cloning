import './index.css'

const rewriteRemoteAssets = (root = document) => {
  root.querySelectorAll?.('[src], [style]').forEach((element) => {
    if (element.src?.includes('cdn-admin.invitationnation.in')) {
      element.src = element.src.replace('https://cdn-admin.invitationnation.in', '/cdn-admin')
    }
    if (element.style?.cssText.includes('cdn-admin.invitationnation.in')) {
      element.style.cssText = element.style.cssText.replaceAll('https://cdn-admin.invitationnation.in', '/cdn-admin')
    }
  })
}

const observer = new MutationObserver(() => rewriteRemoteAssets())
observer.observe(document.documentElement, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ['src', 'style'],
})
rewriteRemoteAssets()

if (!new URLSearchParams(window.location.search).has('slug')) {
  window.history.replaceState({}, '', `${window.location.pathname}?slug=wed002-livedemo`)
}

const script = document.createElement('script')
script.type = 'module'
script.src = '/reference/index.js'
document.body.appendChild(script)
