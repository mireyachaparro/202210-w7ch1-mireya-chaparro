import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const DATA_FILE = process.env.DATA_FILE;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWD = process.env.DB_PASSWD;
export const DB_CLUSTER = process.env.DB_CLUSTER;
