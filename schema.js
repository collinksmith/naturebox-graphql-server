import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import fetch from 'node-fetch';

const BASE_URL = 'http://local.naturebox.com/nb_api/rest';

const NutritionFactsType = new GraphQLObjectType({
  name: 'NutritionFactsType',

  fields: (nt) => ({
    vegan: { type: GraphQLString }
  })
})

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  description: '...',

  fields: () => ({
    reviewId: { 
      type: GraphQLString,
      resolve: (review) => review.review_id,
    },
    productId: { 
      type: GraphQLString,
      resolve: (review) => review.prouct_id,
    },
    title: { type: GraphQLString },
    detail: { type: GraphQLString },
    nickname: { type: GraphQLString },
    rating: { type: GraphQLString },
  })
})

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: '...',

  fields: () => ({
    attributeSetId: { 
      type: GraphQLString,
      resolve: (product) => product.attribute_set_id,
    },
    calories: { type: GraphQLString },
    entityId: { 
      type: GraphQLString,
      resolve: (product) => product.entity_id,
    },
    ingredients: { type: GraphQLString },
    name: { type: GraphQLString },
    nutritionFacts: {
      type: NutritionFactsType,
      resolve: (product) => product.nutrition_facts
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: (product) =>
        fetch(`${BASE_URL}/products/${product.sku}/reviews`)
          .then(res => res.json())
    },
    sku: { type: GraphQLString },
    squareImage: { 
      type: GraphQLString,
      resolve: (product) => product.square_image,
    },
    tagLine: {
      type: GraphQLString,
      resolve: (product) => product.tag_line,
    },
    totalReviewsCount: {
      type: GraphQLString,
      resolve: (product) => product.total_reviews_count,
    },
    typeId: {
      type: GraphQLString,
      resolve: (product) => product.type_id,
    },
    urlKey: { 
      type: GraphQLString,
      resolve: (product) => product.url_key,
    },
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
