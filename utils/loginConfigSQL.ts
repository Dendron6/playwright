export const config:{user:string,password:string, server:string,database:string,options:object} = {
    user: process.env.SQLSERVER_USERNAME,
    password: process.env.SQLSERVER_PASSWORD,
    server: process.env.SERVER_NAME,
    database: process.env.DATA_BASE,
    options: {
        trustServerCertificate: true
    }
}