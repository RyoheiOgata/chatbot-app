import './App.css'
import { Chat } from './Chat'
import { ThemeController } from './ThemeController'

function App() {

  return (
    <div className='pb-10 h-screen'>
      <ThemeController />
      <Chat />
    </div>
  )
}

export default App
