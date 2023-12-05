import {config} from './loginConfigSQL'
import sql = require ("mssql");
require('dotenv').config()



const query1 = `SELECT TOP (3)
      [SubmissionDate]
      ,[Rating]
      ,[Comments]
      ,[AppointmentTypeID]
  FROM [SelfScheduling].[dbo].[Feedback]
  ORDER BY SubmissionDate Desc`

export async function returnOfQuery() {
        await sql.connect(config) //  browser.config.SQL_config
        const result = await sql.query(query1)
        return result.recordset

    }





