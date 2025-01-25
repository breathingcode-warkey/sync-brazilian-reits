import env from 'env-var'

export const variables = {
  corsOriginPermission: env.get('CORS_ORIGIN_PERMISSION').required().asString(),
  apiKey: env.get('CATALYST_API_KEY').required().asString(),
  domainName: env.get('CATALYST_DOMAIN_NAME').required().asString(),
  credentialsPath: env.get('CREDENTIALS_PATH').required().asString(),
  googleSheets: {
    authScope: env.get('GOOGLE_AUTH_SCOPE').required().asString(),
    spreadSheetId: env.get('GOOGLE_SHEETS_SPREADSHEETID').required().asString(),
  },
  catalystHostNameAssets: env
    .get('CATALYST_HOST_NAME_ASSETS')
    .required()
    .asString(),
  timezone: env.get('TZ').required().asString(),
  dbCatalyst: {
    host: env.get('DB_CATALYST_HOST').required().asString(),
    user: env.get('DB_CATALYST_USER').required().asString(),
    pass: env.get('DB_CATALYST_PASS').required().asString(),
    name: env.get('DB_CATALYST_NAME').required().asString(),
    port: env.get('DB_CATALYST_PORT').required().asInt(),
    ssl: env.get('RDS_PROXY_SSL').required().asString(),
    rdsProxy: env.get('RDS_PROXY_DB_CATALYST').required().asString()
  },
  dbMongo: {
    user: env.get('DB_MONGO_USER').required().asString(),
    pass: env.get('DB_MONGO_PASSWORD').required().asString(),
    url: env.get('DB_MONGO_URL').required().asString(),
    port: env.get('DB_MONGO_PORT').required().asInt(),
    ssl: env.get('DB_MONGO_SSL').required().asString()
  }
}
