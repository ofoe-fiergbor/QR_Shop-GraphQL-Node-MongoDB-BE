const merchantResolver = require('./merchant')

module.exports ={
    Query:{
        ...merchantResolver.Query
    }
}