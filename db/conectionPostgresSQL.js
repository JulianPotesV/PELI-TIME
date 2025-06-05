import pg from "pg";

export const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "pelitime_bd",
    user: "postgres",
    password: "America1927",
});