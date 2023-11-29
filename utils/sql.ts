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


    // async queryErrorCatch(queryError = query) {
    //     const listOfErrors = ["Please call us so we can help you schedule.", "We have a technical problem", "Tenemos un problema técnico"]
    //     if (await $('h2').isExisting() && listOfErrors.includes(await $('h2').getText())) {
    //         await sql.connect(config)
    //         const result = await sql.query(queryError)
    //         await browser.pause(500)
    //         await console.log("________________________________________________")
    //         await console.log("Time of the error: " + new Date().toUTCString())
    //         await console.log(result.recordset)
    //         await console.log(await $('h2').getText())
    //         await console.log("________________________________________________")
    //     }
    // },

    async returnListOfValuesFromDataBase(query){
        let ls = []
        const x = await this.returnOfQuery(query)
        for(let i = 0; i < x.length; i++){
            ls.push(x[i].name)
        }
        return ls.sort()
    },


