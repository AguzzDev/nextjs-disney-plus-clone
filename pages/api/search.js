import { GraphQLClient } from 'graphql-request'

export default async (req, res) => {
  const graphqlClient = new GraphQLClient(process.env.API_URL, {
    headers: {
      Authorization: process.env.API_TOKEN
    }
  })

  const search = await graphqlClient.request(`
  query($body:String!,$orderBy:VideoOrderByInput!,$genre:String!){
    videos (orderBy:$orderBy,where:{
      title_contains: $body,
      tags_contains_all:[$genre]
    }){
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
  `,
  { body: req.body.params.s, orderBy: req.body.params.orderBy, genre: req.body.params.genre }
  )

  res.status(200).json(search.videos)
}
