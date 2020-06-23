var dotenv =require('dotenv');
dotenv.config();

module.exports=
{ 
      MONGODB_URL : process.env.MONGODB_URL || 'mongodb://localhost/amazona',
      JWT_SECRET: process.env.JWT_SECRET||'AMAZONA_DEV_123_<>'
}