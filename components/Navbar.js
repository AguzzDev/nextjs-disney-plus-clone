import Image from 'next/image'
import Link from 'next/link'

import { IconXS } from './Icons'
import { SearchIcon, UserIcon } from '@heroicons/react/outline'

export default function Navbar () {
  return (
    <main className='flex justify-between w-full px-3 py-2 z-50 sticky top-0 bg-[#040714]'>
      <Link href='/' passHref>
        <Image src='/logo.png' width={100} height={50} className='object-cover cursor-pointer' />
      </Link>

      <div className='flex items-center space-x-5'>
        <Link href='/search' passHref>
          <div className='cursor-pointer'>
            <IconXS Icon={SearchIcon} />
          </div>
        </Link>
        <IconXS Icon={UserIcon} />
      </div>
    </main>
  )
}
