// =============================================
//  config/db.js — MongoDB Connection Utility
// =============================================
//
//  Mongoose is an ODM (Object-Document Mapper) for MongoDB.
//  This module exports a single async function that:
//    1. Reads the MONGO_URI from .env
//    2. Attempts to connect to the database
//    3. Logs success or exits the process on failure
//
//  Usage:  import connectDB from "./config/db.js";
//          await connectDB();
// =============================================

import mongoose from "mongoose";

/**
 * connectDB
 * ---------
 * Establishes a connection to our MongoDB database.
 *
 * Why a separate file?
 *   Keeps the connection logic decoupled from server.js.
 *   If we ever need to swap databases or add connection
 *   pooling options, we only change this one file.
 */
const connectDB = async () => {
    try {
        // mongoose.connect() returns a connection object.
        // We destructure `connection` to log the host for confirmation.
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Mongoose 8+ does not require useNewUrlParser or
            // useUnifiedTopology — they are now defaults.
        });

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        // If the DB is unreachable, there's no point keeping
        // the server alive — exit with a failure code.
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
