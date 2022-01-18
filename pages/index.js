import { GraphQLClient, gql } from 'graphql-request'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { companies } from '../json'
import Categories from '../components/Categories'
import { filterVideos, randomVideo, unSeenVideos } from '../utils'
import FrontPage from '../components/FrontPage'
import Layout from '../components/Layout'
import { SliderCompanies } from '../components/Slider'
import Loading from '../components/Loading'

export default function Home ({ videos, popularity }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [])

  return (
    <>
      <Head>
        <title>Disney Clone</title>
      </Head>

      {loading
        ? <Loading />
        : (
          <Layout title='Inicio - Disney Plus'>
            <main className='px-3 w-full'>

              <FrontPage videos={randomVideo(videos)} />
              <SliderCompanies videos={companies} />
              <Categories genre='Populares' videos={unSeenVideos(popularity)} />
              <Categories genre='Acción' videos={filterVideos(videos, 'Acción')} />
              <Categories genre='Drama' videos={filterVideos(videos, 'Drama')} />
              <Categories genre='Bélica' videos={filterVideos(videos, 'Bélica')} />
            </main>
          </Layout>
          )}

    </>
  )
}
export const getStaticProps = async () => {
  const graphqlClient = new GraphQLClient(process.env.API_URL, {
    headers: {
      Authorization: process.env.API_TOKEN
    }
  })

  const query = gql`
query(){
  videos {
    id,
    title,
    description,
    slug,
    seen,
    tags,
    popularity,
    published,
    frontImage {
      url
    },
        thumbnail {
      url
    },
    mp4 {
      url
    }
  }
}
`
  const queryOrderBy = gql`
query(){
        videos(orderBy: popularity_DESC) {
    id,
    title,
    popularity,
    published,
    description,
    slug,
    seen,
    tags,
    frontImage {
      url
    },
        thumbnail {
      url
    },
    mp4 {
      url
    }
  }
}
`

  const data = await graphqlClient.request(query)
  const dataPopularity = await graphqlClient.request(queryOrderBy)

  return {
    props: {
      videos: data.videos,
      popularity: dataPopularity.videos
    }
  }
}
