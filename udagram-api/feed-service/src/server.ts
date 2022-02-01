import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_FEED_MODELS} from './controllers/v0/model.index';


function debugEnv(): void {
  const REQUIRED_ENVIRONMENT_SETTINGS = [
    {name: "POSTGRES_USERNAME", message: "Usernam of Postgres DB"},
    {name: "POSTGRES_PASSWORD", message: "Password of Postgres DB"},
    {name: "POSTGRES_DB", message: "DB Name of Postgres DB"},
    {name: "POSTGRES_HOST", message: "Host of Postgres DB"},
    {name: "AWS_REGION", message: "Our AWS Region"},
    {name: "AWS_PROFILE", message: "The used AWS Profile"},
    {name: "AWS_BUCKET", message: "The S3 Bucket"},
    {name: "URL", message: "Local URL"},
    {name: "JWT_SECRET", message: "Secret for JWT"},
  ]
  for (const env of REQUIRED_ENVIRONMENT_SETTINGS) {
    if (!process.env[env.name]) {
      console.error(`Environment variable ${env.name} should be set: ${env.message}`);
    } else {
      // convenient for debug; however: this line exposes all environment variable values - including any secret values they may contain
      console.log(`Environment variable ${env.name} is set to : ${process.env[env.name]}`);
    }
  }
}

(async (): Promise<void> => {
  await sequelize.addModels(V0_FEED_MODELS);

  console.debug("Initialize database connection...");
  debugEnv();
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  // We set the CORS origin to * so that we don't need to
  // worry about the complexities of CORS this lesson. It's
  // something that will be covered in the next course.
  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    origin: '*',
  }));

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
