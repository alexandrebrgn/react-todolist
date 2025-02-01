import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { MyToDoListProvider } from "@/context/to_do_list_context.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyToDoListProvider>
      <App/>
    </MyToDoListProvider>
  </StrictMode>,
)
