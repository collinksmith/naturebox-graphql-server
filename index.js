import express from 'express';
import graphQLHTTP from 'express-graphql';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

import schema from './schema';

const app = express();

app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true,
}))

app.get('/schema', (req, res) => {
  res.json(schema)
})

app.listen(
  5000,
  () => console.log('GraphQL Server running at http://localhost:5000')
);