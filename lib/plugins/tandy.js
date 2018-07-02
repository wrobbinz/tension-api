'use strict';


module.exports = {
  plugins: {
    options: {
      actAsUser: true,
      userIdProperty: 'userId',// as it's going to appear in the jwt
      userUrlPrefix: '/user',
      userModel: 'users',
      prefix: process.env.API_PREFIX,
    },
  },
};
