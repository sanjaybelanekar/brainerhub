export default {
  serverBaseURL: "http://127.0.0.1:7777",
  api: {
    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getOne: "/users/",
      getAll: "/users",
    },
    products: {
      create: "/products",
      update: "/products/",
      delete: "/products/",
      getOne: "/products/",
      getAll: "/products",
    },

    auth: {
      login: "/auth/user-login",
      verifyToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
    },
  },
};
