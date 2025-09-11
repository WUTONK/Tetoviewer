import '@douyinfe/semi-ui/dist/css/semi.min.css'
import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Noti from './Noti'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <Noti></Noti> */}
  </StrictMode>
)
