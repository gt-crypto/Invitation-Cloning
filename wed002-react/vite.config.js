import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const liveDemoData = {
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

const localInvitationData = {
  name: 'local-invitation-data',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      if (request.url?.startsWith('/api/rest/api/public/templates/slug/wed002-livedemo')) {
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify({ status: 200, data: liveDemoData }))
        return
      }
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), localInvitationData],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.invitationnation.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/cdn-admin': {
        target: 'https://cdn-admin.invitationnation.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn-admin/, ''),
      },
    },
  },
})
