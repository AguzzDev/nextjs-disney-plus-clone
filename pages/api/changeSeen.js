import { GraphQLClient } from 'graphql-request'

export default async ({ body }, res) => {
  const graphqlClient = new GraphQLClient(process.env.API_URL, {
    headers: {
      Authorization: process.env.API_TOKEN
    }
  })
  await graphqlClient.request(
    `
    mutation($slug:String!){
      updateVideo(where:
        {slug:$slug},
        data:{seen:true}
      ){
        id,
        title,
        seen
      }
    }
    `,
    { slug: body.body }
  )

  await graphqlClient.request(
    `
    mutation($slug:String!){
      publishVideo(where:
        {slug:$slug},
        to:PUBLISHED
        ){
          id,
          title
        }
    }
    `,
    { slug: body.body }
  )

  res.status(201).json({ slug: body.body })
}
