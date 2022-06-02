const CreteTeamTable = require('../helper/createTables');
const {db} = require('../DB/DB.connection');
const util = require('util');
const querys = util.promisify(db.query).bind(db);

const addTeam = async (req,res)=>{
    try {
        const { teamId, teamName } = req.body
        console.log(req.body);
        const result = await querys(`INSERT INTO teams VALUES("${teamId}","${teamName}")`);
        res.json(200,"Team added....");
    } catch (error) {
        console.log(error);
    }
}

const updateTeam =  async (req,res)=>{
    try {
        const queryString = [];
        
        Object.entries(req.body).forEach((element) => {
            if (element[1] !== "") {
                queryString.push(` ${element[0]} = "${element[1]}" `);
            }
        })
        await querys(`UPDATE teams SET ${String(queryString)} WHERE team_id = "${req.params.teamId}"`);
        res.json(200,"Team Updated....");
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    addTeam,
    updateTeam
}