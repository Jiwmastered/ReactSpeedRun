import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PageProvider } from './contexts/PageProvider.jsx'
import { PlayerProvider } from './contexts/PlayerProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider>
    <PageProvider>
      <App />
    </PageProvider>
    </PlayerProvider>
  </StrictMode>,
)
