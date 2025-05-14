import './App.css'
import { Chat } from './Chat'
import Box from '@mui/material/Box';

function App() {

  return (
    <Box className="app-container">
      
      {import.meta.env.VITE_GEMINI_API_KEY}
      <Chat />
    </Box>
  )
}

export default App
