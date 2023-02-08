require("dotenv").config();

let configApp = {
  api: {
    API_BASE_URL: process.env.REACT_APP_BACKEND_URL,
    ROUTER_BASE_NAME: null,
  },
  app: {
    /**
     * The base URL for all locations. If your app is served from a sub-directory on your server, you'll want to set
     * this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.
     */
    // APP_BASE_URL: "http://localhost:3000",
    ROUTER_BASE_NAME: null,
  },
};

export default configApp;
