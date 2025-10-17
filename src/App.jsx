import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HeroSlider from './components/HeroSlider'
import ShortsCarousel from './components/ShortsCarousel'
import ShortsSelfGrooming from './components/SelfGrooming'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <HeroSlider/>
 <ShortsCarousel/>
 <ShortsSelfGrooming/>
    </>
  )
}

export default App
