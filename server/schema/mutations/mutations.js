const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString
} = graphql;

const UserType = require('../types/user_type');


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, {authService, req}) {
                return authService.signUp({ email, password, req });
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args ,{ authService, req }) {
                return authService.signOut(req);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, { authService, req }) {
                return authService.logIn({email, password, req });
            }
        }
    }
});

module.exports = mutation;
