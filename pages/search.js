import Link from 'next/link'

import Layout from '../components/Layout'
import { useRef } from 'react'
import { IconXS } from '../components/Icons'
import { SearchIcon } from '@heroicons/react/solid'
import useSearch from '../hooks/useSearch'

export default function Search() {
  const debounceRef = useRef()

  const { handleSubmit, setOrder, setGenre, query, search } = useSearch(debounceRef)

  return (
    <Layout title='Search - Disney Plus'>
      <div className='mb-10 p-5 bg-[#040a26] '>

        <form onSubmit={handleSubmit}>
          <div className='flex items-center space-x-3 py-3 px-5 border-b border-gray-300 w-full sm:w-3/6'>
            <IconXS Icon={SearchIcon} color='#040714' />
            <input ref={debounceRef} value={query} onChange={handleSubmit} className='font-bold text-lg bg-transparent w-5/6 outline-none' />
          </div>

          <div className='flex space-x-5 mt-5'>
            <select onChange={(e) => setOrder(e.target.value)} className='bg-black p-2'>
              <option value='title_ASC'>Ascendente</option>
              <option value='title_DESC'>Descendente</option>
            </select>

            <select onChange={(e) => setGenre(e.target.value)} className='bg-black p-2'>
              <option onChange={(e) => setGenre(e.target.value)} value='All'>Todos</option>
              <option onChange={(e) => setGenre(e.target.value)} value='Aventura'>Aventura</option>
              <option onChange={(e) => setGenre(e.target.value)} value='Drama'>Drama</option>
              <option onChange={(e) => setGenre(e.target.value)} value='Acción'>Acción</option>
            </select>
          </div>
        </form>

      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 px-3'>
        {search.length === 0
          ? <h1>No hay peliculas para esta busqueda :(</h1>
          : search.map(({ id, thumbnail, slug }) => (
            <Link href={`/${slug}`} key={id}>
              <div className='h-[300px] cursor-pointer'>
                <img loading='lazy' src={thumbnail.url} className='w-full h-full rounded-xl' />
              </div>
            </Link>
          ))}
      </div>
    </Layout>
  )
}
