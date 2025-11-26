import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { InboxQuickApp } from './InboxQuickApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InboxQuickApp />
  </StrictMode>
)
