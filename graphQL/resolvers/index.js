const merchantResolver = require('./merchant')
const userResolver = require('./user')

module.exports ={
    Query:{
        ...merchantResolver.Query
    },
    Mutation:{
        ...userResolver.Mutation
    }
}