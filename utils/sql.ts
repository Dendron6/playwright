const sql = require('mssql')
const config = require('./loginConfigSQL')
const providerRadOnc = require("./providernv/providerRadOnc");
require('dotenv').config()

const query = `SELECT TOP (3) [ErrorId]
,[Message]
,[DateTime]
FROM [SelfScheduling].[dbo].[Errors]
order by ErrorId desc;`


module.exports = {
    async returnOfQuery(query) {
        await sql.connect(config) //  browser.config.SQL_config
        const result = await sql.query(query)
        return result.recordset

    },
    async returnOfProviderQuery(query, providerName) {
        const pool = await sql.connect(config) //  browser.config.SQL_config
        const result = await pool.request().input('provider', sql.VarChar, providerName).query(query)
        return result

    },




    async returnListOfValuesFromDataBase(query){
        let ls = []
        const x = await this.returnOfQuery(query)
        for(let i = 0; i < x.length; i++){
            ls.push(x[i].name)
        }
        return ls.sort()
    },


