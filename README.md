# Naturebox GraphQL Server

A graphql server wrapping the naturebox api.

## Installation

`npm install`

## Running

Start a local server with `npm start`.

## Using

The server runs on port 4000 and accepts graphql queries as POST requests to `/graphql`, e.g. with the body:

```
{
  "query": "{product(id: \"437\") { name sku } }"
}
```

You can also make requests using the [graphiql](https://github.com/graphql/graphiql) interface by going to `localhost:4000/graphql`.

You can see the available attributes [here](schema.graphql).

Example query:

```
{
  product(id: "437") {
    name
    sku
    urlKey
    calories
    reviews {
      reviewId
      productId
      title
      detail
      nickname
      rating
    }
  }
}
```
