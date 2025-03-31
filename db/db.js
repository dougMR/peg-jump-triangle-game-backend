const Sequelize = require('sequelize');
let options = {};
let databaseURL;
if(process.env.RDS_HOSTNAME){
   // DMR 2/26 ? elastic beanstalk - does this change for fly.io?
   databaseURL = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;

   // we're not on localhost
   options = {
       logging: false,
       dialectOptions: {
           ssl: {
               require: true,
               rejectUnauthorized: false,
           },
       },
   };
} else {
    databaseURL = `postgres://localhost:5432/peg_jump_game`;
}


const db = new Sequelize(databaseURL, options);
const GameRecord = require("./GameRecord")(db, Sequelize);

// connect to db
const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        await db.sync({alter: true, logging: false}); //{force: true}
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectToDB();

module.exports = {db, GameRecord};