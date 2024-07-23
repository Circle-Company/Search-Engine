const dotenv = require("dotenv");

// Load env file
if (require.resolve) {
  try {
    dotenv.config({ path: require.resolve("../../.env") });
  } catch (error: any) {
    // This error is thrown when the .env is not found
    if (error.code !== "MODULE_NOT_FOUND") {
      throw error;
    }
  }
}

// Use Cypress env or process.env
declare let Cypress: any | undefined;
const env = typeof Cypress !== "undefined" ? Cypress.env() : process.env; // eslint-disable-line no-undef

const environment = {
  API_VERSION: env.API_VERSION,
  NODE_ENV: env.NODE_ENV || process.env.NODE_ENV,
  DEBUG: env.NODE_ENV !== "production" && env.DEBUG,
  TEST: env.NODE_ENV === "test",
  PRODUCTION: env.NODE_ENV === "production",
  // used for staging enviroments if 'PRODUCTION=true' and 'PRODUCTION_DB_CLEAN_ALLOW=true'
  PRODUCTION_DB_CLEAN_ALLOW: env.PRODUCTION_DB_CLEAN_ALLOW === "true" || false, // default = false
};

const server = {
  PORT: env.PORT || 5000,
  CLIENT_URI: (env.HOST || "http://localhost:") && (env.PORT || 3000),
  JWT_EXPIRES: env.JWT_EXPIRES || 31557600, // one year,
};

const mysql = {
  development: {
    DB_HOST: env.DEVELOPMENT_DB_HOST || "localhost",
    DB_USERNAME: env.DEVELOPMENT_DB_USERNAME || "host",
    DB_PASSWORD: env.DEVELOPMENT_DB_PASSWORD || "admin",
    DB_NAME: env.DEVELOPMENT_DB_NAME,
  },
  test: {
    DB_HOST: env.TEST_DB_HOST || "localhost",
    DB_USERNAME: env.TEST_DB_USERNAME || "host",
    DB_PASSWORD: env.TEST_DB_PASSWORD || "admin",
    DB_NAME: env.TEST_DB_NAME,
  },
  production: {
    DB_HOST: env.PRODUCTION_DB_HOST || "localhost",
    DB_USERNAME: env.PRODUCTION_DB_USERNAME || "host",
    DB_PASSWORD: env.PRODUCTION_DB_PASSWORD || "admin",
    DB_NAME: env.PRODUCTION_DB_NAME,
  },
};
const required = {
  PORT: env.PORT || 5000,
};

// Check if all required configs are present
Object.entries(required).map((entry) => {
  if (!entry[1]) {
    throw new Error(`ERROR: "${entry[0]}" env variable is missing.`);
  }
  return entry;
});

export default {
  ...environment,
  ...server,
  ...required,
  ...mysql,
};
