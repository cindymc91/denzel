const {
    GraphQLObjectType,
    //GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

// Define Movie Type
movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
      //_id: { type: GraphQLID },
       id: { type: GraphQLString },
       link: { type: GraphQLString },
       metascore: { type: GraphQLInt },
       poster: { type: GraphQLString },
       rating: { type: GraphQLFloat },
       synopsis: { type: GraphQLString },
       title: { type: GraphQLString },
       votes: { type: GraphQLFloat},
       year: { type: GraphQLInt },
       date:{type: GraphQLString},
       review:{type:GraphQLString}

    }
});

exports.movieType = movieType;
