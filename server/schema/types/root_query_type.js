const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID
} = graphql;

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        dummyField: { type: GraphQLID}
    }
});

module.exports = RootQueryType;