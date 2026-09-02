import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import VoiceAgent from './pages/VoiceAgent'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path='/agent' element={<VoiceAgent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
