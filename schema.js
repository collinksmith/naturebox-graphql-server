import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import fetch from 'node-fetch';

const BASE_URL = 'http://local.naturebox.com/nb_api/rest';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: '...',

  fields: () => ({
    entityId: { 
      type: GraphQLString,
      resolve: (product) => product.entity_id,
    },
    squareImage: { 
      type: GraphQLString,
      resolve: (product) => product.square_image,
    },
    urlKey: { 
      type: GraphQLString,
      resolve: (product) => product.url_key,
    },
    sku: { type: GraphQLString },
    calories: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    product: {
      type: ProductType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) =>
        fetch(`${BASE_URL}/products/${args.id}`)
          .then(res => res.json())
    }
  })
})

export default new GraphQLSchema({
  query: QueryType,
})
