const merchantResolver = require('./merchant')
const userResolver = require('./user')
const itemResolver = require('./item')

module.exports ={
    Query:{
        ...merchantResolver.Query
    },
    Mutation:{
        ...userResolver.Mutation,
        ...merchantResolver.Mutation,
        ...itemResolver.Mutation
    }
}