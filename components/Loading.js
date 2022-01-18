import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Loading () {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    setInterval(() => setCompleted(prevState => prevState + 7), 200)
  }, [])

  return (
    <div className='grid place-content-center h-[100vh]'>
      <Image src='/logo.png' height={150} width={200} />
      <div className='w-[300px] h-2 bg-white mt-5 overflow-hidden rounded-md'>
        <div className='bg-[#7BDADB] h-full transform duration-500' style={{ width: `${completed}%` }} />
      </div>
    </div>
  )
}
