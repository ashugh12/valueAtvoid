import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import RightTop from './components/RightTop'
import RightBottom from './components/RightBottom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-screen w-full bg-[#000000] overflow-hidden">
      <div className="w-[280px] bg-[#121212]">
        <SideBar />
      </div>

      <div className="flex flex-col gap-4 overflow-hidden ">
        <RightTop />
        <div className='pb-6'>
        <RightBottom />
        </div>
      </div>
    </div>

  )
}

export default App
