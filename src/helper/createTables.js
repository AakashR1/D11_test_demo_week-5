const {db} = require('../DB/DB.connection');
const fs = require('fs');
const path = require('path');
const util = require('util');

const querys = util.promisify(db.query).bind(db);
const teamTableCreationQuery = fs.readFileSync(path.join(__dirname,"../sql/teamQuery.sql"),'utf-8');

const createTeamTable = async()=>{
    try {
        await querys(teamTableCreationQuery);
        console.log("defalut team table has been created...");
    } catch (error) {
        console.log(error);
    }
};

const DevTableCreationQuery = fs.readFileSync(path.join(__dirname,"../sql/Dev.table.sql"),'utf-8');

const CreateDevTable =async ()=>{
    try {
        await querys(DevTableCreationQuery);
        console.log("defalut dev. table has been created...");
    } catch (error) {
        console.log(error);
    }
}

createTeamTable();
CreateDevTable();
module.exports = createTeamTable;

