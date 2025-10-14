import {connect} from 'mongoose';
import {DB_NAME} from '../constants.js'

async function connectDb() {
    try {
        const connectionIns = await connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log('\n Mongo_DB connected !! ', connectionIns.connection.host)
    } catch (error) {
        console.log('mongodb connection :: error :: ', error);
        process.exit(1)
    };
};

export default connectDb;