import { ChevronLeftIcon } from '@heroicons/react/solid'
import { gql, GraphQLClient } from 'graphql-request'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { IconXS } from '../components/Icons'
import Layout from '../components/Layout'
import { dateFormat, tagsFormat } from '../utils'
import Modal from '../components/Modal'

export default function PeliculaDetail ({ videos }) {
  const router = useRouter()
  const { title, frontImage, description, tags, published } = videos

  return (
    <Layout title={`${title} - Disney Plus`}>
      <div>
        <Image src={frontImage.url} layout='fill' className='object-cover' />

        <div className='absolute top-32 ml-10 flex flex-col space-y-5 w-4/6'>
          <div className='flex space-x-3'>
            <button onClick={() => router.back()} className='pt-2'>
              <IconXS Icon={ChevronLeftIcon} />
            </button>
            <h1 className='text-5xl'>{title}  ({dateFormat(published)}) </h1>
          </div>
          <p>{description}</p>
          <ul className='inline-flex space-x-3'>
            <li>{tagsFormat(tags)}</li>
          </ul>

          <Modal videos={videos} />
        </div>

      </div>
    </Layout>
  )
}

export const getServerSideProps = async (pageQuery) => {
  const graphqlClient = new GraphQLClient(process.env.API_URL, {
    headers: {
      Authorization: process.env.API_TOKEN
    }
  })
  const slug = pageQuery.query.slug
  const query = gql`
      query($slug:String!){
        videos(where:{
        slug: $slug
    }) {
        id,
        title,
        description,
        published,
        seen,
        tags,
        slug,
        frontImage{
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
  const variable = { slug }
  const data = await graphqlClient.request(query, variable)

  return {
    props: {
      videos: data.videos[0]
    }
  }
}
