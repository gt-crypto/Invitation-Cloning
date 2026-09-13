import './index.css'

export const liveDemoData = {
  id: '69f30a11626e9478f9090b52',
  templateCode: 'wed002',
  categoryType: 'WEDDING',
  sectionSnapshot: {
    config: {},
    styles: {},
    content: {
      hero: {
        groom_name: 'Aryan kapoor',
        bride_name: 'Aarna Nair',
        wedding_date: '2026-11-27T10:15',
        display_date_text: 'Nov 26 & 27, 2026',
        venue_link: 'https://maps.google.com/?cid=12798184235780506858',
        main_location_name: 'Fiestaa Resort',
        contact: '+91 6364469555',
      },
      couple_profile: {
        bride_photo: 'ADMIN|admin/templates/69f30a11626e9478f9090b52/a3e63964-6d93-4e89-8a2f-5e1d446e74e9_image.jpg',
        groom_photo: 'ADMIN|admin/templates/69f30a11626e9478f9090b52/2a9c97c3-90d4-4496-82d4-3d958dc74562_image.jpg',
        bride_parents: 'D/o Mr. Suresh Nair & Mrs. Lakshmi Nair',
        bride_bio: 'A free spirit wrapped in grace — Aarna moves through life with quiet confidence, an infectious laugh, and a kindness that makes everyone around her feel at home.',
        groom_parents: 'S/o Mr. Rajesh Kapoor & Mrs. Meena Kapoor',
        groom_bio: "A gentle soul with a poet's heart and an architect's mind — Aryan finds beauty in the details, whether in the curve of a building or the warmth of a quiet afternoon.",
      },
      our_story: [{
        year: '2024',
        title: 'New Year, New Promise',
        date: '01 Nov 2024',
        description: "As midnight approached over the Mysore Palace, Aryan took Aarna's hand and asked the question the whole year had been building toward. She said yes before he finished asking.",
        image: 'ADMIN|admin/templates/69f30a11626e9478f9090b52/7d818145-cfe0-4a43-9fc7-f142f51ce9a4_image.jpg',
      }],
      schedule: [{
        sectionTitle: 'haldi',
        date: '2026-11-26',
        locationAddress: 'Fiestaa Resort',
        mapLocation: 'https://maps.google.com/?cid=12798184235780506858',
        scheduleEventsDetails: [{ eventName: 'Haldi', eventTime: '7:30 pm' }],
      }],
      family: {
        bride_family_photo: 'ADMIN|admin/templates/69f30a11626e9478f9090b52/a6e5073d-0358-400a-a89b-617e10f68d9f_image.jpg',
        groom_family_photo: 'ADMIN|admin/templates/69f30a11626e9478f9090b52/b82ed919-69f3-4ca6-b68e-ff81fabcbfbe_image.jpg',
      },
      music: { selected_song: '/music/Wedding.mp3', custom_song: 'none' },
    },
    images: {
      'couple_profile|bride_photo': '/templates/a3e63964-6d93-4e89-8a2f-5e1d446e74e9_image.jpg',
      'couple_profile|groom_photo': '/templates/2a9c97c3-90d4-4496-82d4-3d958dc74562_image.jpg',
      'our_story|0|image': '/templates/7d818145-cfe0-4a43-9fc7-f142f51ce9a4_image.jpg',
      'family|bride_family_photo': '/templates/a6e5073d-0358-400a-a89b-617e10f68d9f_image.jpg',
      'family|groom_family_photo': '/templates/b82ed919-69f3-4ca6-b68e-ff81fabcbfbe_image.jpg',
    },
  },
}

window.__WED002_DATA__ = liveDemoData

// Intercept XMLHttpRequest for Axios in production & local
const OriginalXHR = window.XMLHttpRequest
function MockXHR() {
  const xhr = new OriginalXHR()
  let requestUrl = ''

  const origOpen = xhr.open
  xhr.open = function (method, url, ...args) {
    requestUrl = String(url)
    return origOpen.call(xhr, method, url, ...args)
  }

  const origSend = xhr.send
  xhr.send = function (...args) {
    if (requestUrl.includes('/templates/slug/wed002-livedemo') || requestUrl.includes('/templates/slug/')) {
      const responseData = JSON.stringify({ status: 200, data: liveDemoData })
      Object.defineProperty(xhr, 'status', { value: 200, configurable: true })
      Object.defineProperty(xhr, 'statusText', { value: 'OK', configurable: true })
      Object.defineProperty(xhr, 'readyState', { value: 4, configurable: true })
      Object.defineProperty(xhr, 'responseText', { value: responseData, configurable: true })
      Object.defineProperty(xhr, 'response', { value: responseData, configurable: true })
      Object.defineProperty(xhr, 'getAllResponseHeaders', {
        value: () => 'content-type: application/json\r\n',
        configurable: true,
      })
      Object.defineProperty(xhr, 'getResponseHeader', {
        value: (header) => (header?.toLowerCase() === 'content-type' ? 'application/json' : null),
        configurable: true,
      })
      setTimeout(() => {
        xhr.onreadystatechange?.(new Event('readystatechange'))
        xhr.onload?.(new ProgressEvent('load'))
        xhr.dispatchEvent(new Event('readystatechange'))
        xhr.dispatchEvent(new ProgressEvent('load'))
        xhr.dispatchEvent(new ProgressEvent('loadend'))
      }, 0)
      return
    }

    return origSend.apply(xhr, args)
  }

  return xhr
}
window.XMLHttpRequest = MockXHR

// Intercept fetch for template data
const origFetch = window.fetch
window.fetch = async function (input, init) {
  const url = typeof input === 'string' ? input : input?.url || ''
  if (url.includes('/templates/slug/wed002-livedemo') || url.includes('/templates/slug/')) {
    return new Response(JSON.stringify({ status: 200, data: liveDemoData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return origFetch.apply(window, [input, init])
}

const localAssetNames = new Set([
  '13f7a61d-516d-452b-9e04-115785d4bba2_image.webp',
  '1ef4b128-8899-4375-bb13-15f84775ce3a_image.webp',
  '38421035-c91c-4d87-865e-7240c361ed29_image.webp',
  '39d03844-e926-4511-b265-90c65113f608_image.webp',
  '3c29b45b-428e-4144-a277-85a1a58f1d20_image.webp',
  '4dbf68a6-be6a-42d7-8845-53ab1753e2b5_image.webp',
  '550c7a56-a879-4a4b-b2fb-9cefde69d8c3_image.webp',
  '753a5536-86d8-413e-ab22-46d1daaec8d4_image.webp',
  '96543073-d0d7-451a-8ed6-f030b2febed5_image.webp',
  '96d1e16f-ab86-45b0-a85e-78ca3179af80_image.webp',
  '988f4f76-3f16-4cb3-8d29-88350197a769_image.webp',
  'aeb8e3f4-8743-4630-add4-0156b33942c6_image.webp',
  'c09e0ce8-6a3f-4876-955b-c6b4fb7a9c8d_image.webp',
  'c94f5a9f-c896-4030-915b-07a0961526f6_image.webp',
  'cf2c9a32-b90e-44c4-8f26-ef7ec4e83c64_image.webp',
  'd1e050f5-bd02-4142-949c-b51635a12a9f_image.webp',
  'e32b2b78-bd6b-4e28-9106-e2a269666b49_image.webp',
  'e659e0b8-1d42-4029-b2c0-63ec66f72819_image.webp',
  'ffe3e32e-8e2a-4c71-a3a4-fb323db0530d_image.webp',
  'leafShape-CLwbFqNT.svg',
])

const rewriteRemoteAssets = (root = document) => {
  root.querySelectorAll?.('[src], [style]').forEach((element) => {
    const src = element.getAttribute?.('src') || ''
    if (src) {
      const filename = src.split('/').pop()?.split('?')[0]
      if (filename && localAssetNames.has(filename)) {
        element.src = `/assets/${filename}`
      }
    }
    const styleText = element.style?.cssText || ''
    if (styleText.includes('_image.webp') || styleText.includes('leafShape')) {
      localAssetNames.forEach((fn) => {
        if (styleText.includes(fn)) {
          element.style.cssText = element.style.cssText.replace(new RegExp(`https?://[^'")]*?/${fn}`, 'g'), `/assets/${fn}`)
        }
      })
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
script.src = `/reference/index.js?v=${Date.now()}`
document.body.appendChild(script)
