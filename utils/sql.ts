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

//     async report(cancerType) {
//
//         queryError = `SELECT derivedtbl_1.Cancer, ProviderGroups.GroupID, ProviderGroups.Name, ProviderGroupList.ProviderID, ProviderIDs.Provider, ProviderGroupList.VisitID, ProviderGroupList.DeptID1, ProviderGroupList.DeptID2,
//                   ProviderGroupList.DeptID3
// FROM     CancerProviderSurveyMap WITH (NOLOCK) INNER JOIN
//                       (SELECT Cancer, Phone, Email, VisitTypeId, ProviderId, DeptId, EngageSurveyId, ProviderHourBuffer, LanguageCode, CancerTypeID
//                        FROM      CancerTypes WITH (NOLOCK)
//                        WHERE   (LanguageCode = 'en-US')) AS derivedtbl_1 ON CancerProviderSurveyMap.CancerID = derivedtbl_1.CancerTypeID INNER JOIN
//                   ProviderGroups WITH (NOLOCK) ON CancerProviderSurveyMap.ProviderGroupID = ProviderGroups.GroupID INNER JOIN
//                   ProviderGroupList WITH (NOLOCK) ON ProviderGroups.GroupID = ProviderGroupList.GroupID INNER JOIN
//                   ProviderIDs WITH (NOLOCK) ON ProviderGroupList.ProviderID = ProviderIDs.ProviderID
// Where Cancer like '${cancerType}'+'%' and ProviderGroupList.GroupID like '${providerRadOnc.GroupID[cancerType]}'
// ORDER BY derivedtbl_1.Cancer`
//
//         await sql.connect(config)
//         const result = await sql.query(queryError)
//         return result
//     }

}
