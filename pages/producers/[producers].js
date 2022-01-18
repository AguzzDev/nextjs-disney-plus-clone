import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";

import Layout from "../../components/Layout";
import { formatTitle } from "../../utils"

export default function Producers({ videos }) {
  console.log(videos);
  return (
    <Layout title={` ${formatTitle(videos)} - Disney Plus`}>
      {videos.length === 0
        ? <h1 className="text-white px-3 text-2xl mt-5">No hay peliculas</h1>
        : (
          <div className='w-full my-5 px-3'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
              {videos.map(({ id, slug, thumbnail }, i) => (
                <Link key={id} href={`/${slug}`}>
                  {i === 0
                    ? <div className="h-[200px] md:h-full md:row-span-2 cursor-pointer" >
                      <img src={thumbnail.url} className='w-full h-full bg-cover rounded-xl' />
                    </div>
                    : <div className="cursor-pointer h-[200px]" >
                      <img src={thumbnail.url} className='w-full h-full bg-cover rounded-xl' />
                    </div>
                  }
                </Link>
              ))}
            </div>
          </div>
        )
      }
    </Layout>
  )
}

export const getServerSideProps = async (pageQuery) => {
  const graphqlClient = new GraphQLClient(process.env.API_URL, {
    headers: {
      "Authorization": process.env.API_TOKEN
    }
  })
  const producers = pageQuery.query.producers
  const query = gql`
      query($producers:String!){
        videos(where:{
        producers: [$producers]
    }) {
        id,
        slug,
        title,
        description,
        seen,
        tags,
        producers,
        frontImage{
        url,
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
  const variable = { producers }
  const data = await graphqlClient.request(query, variable)

  return {
    props: {
      videos: data.videos
    }
  }
}
