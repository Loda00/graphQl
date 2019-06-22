const express = require('express')
require('dotenv').config()
const { graphql, buildSchema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const graphqlHTTP = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const { resolvers } = require('./lib/resolves')

const app = express()

const port = process.env.PORT || 3000

const typeDefs =
  readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
  )

const schema = makeExecutableSchema({
  typeDefs, resolvers
})  

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})
