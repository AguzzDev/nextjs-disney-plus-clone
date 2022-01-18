import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function useSearch (ref) {
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('title_ASC')
  const [genre, setGenre] = useState('All')
  const [search, setSearch] = useState([])

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setQuery(e.target.value)

    if (ref.current) { clearTimeout(ref.current) }

    ref.current = setTimeout(() => {
      axios.post('/api/search', {
        params: {
          s: query,
          orderBy: order,
          genre: genre
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          setSearch(res.data)
        })
        .catch(err => console.log(err))
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      axios.post('/api/search', {
        params: {
          s: !query ? router.query.s : query,
          orderBy: order,
          genre: genre
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          router.push(`/search?s=${!query ? router.query.s : query}&orderBy=${order}&genre=${genre}`)
          setSearch(res.data)
        })
        .catch(err => console.log(err))
    }, 500)
  }, [order, genre, query])

  return { handleSubmit, setOrder, setGenre, query, search }
}
