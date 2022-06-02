const CreteTeamTable = require('../helper/createTables');
const {db} = require('../DB/DB.connection');
const util = require('util');
const querys = util.promisify(db.query).bind(db);
const JWT_generator = require('../helper/signJWT');
const addDeveloper = async (req,res)=>{
    try {
        const { email, password, team_id, dev_id, name, image, dob, isActive } = req.body
        console.log(req.body);
        if(email !== undefined && email !== "" && password !== undefined && password !== "" && team_id !== undefined && team_id !== "" && dev_id !== undefined && dev_id !== "" ){
            const result = await querys(`INSERT 
            INTO 
            developer 
            VALUES(${dev_id || null},"${email}","${password}",${name || null},${image || null},"${team_id}",${dob || null},${isActive || true})`);             
            return res.send(200,"dev added...");
        }
        res.json(402,"Email, Password and team id is mendetory....");
    } catch (error) {
        res.send(403,error.sqlMessage)
        console.log(error);
    }
}

const   updateTeam =  async (req,res)=>{
    try {
        const queryString = [];
        
        Object.entries(req.body).forEach((element) => {
            if (element[1] !== "") {
                queryString.push(` ${element[0]} = "${element[1]}" `);
            }
        })
        await querys(`UPDATE developer SET ${String(queryString)} WHERE dev_id = "${req.params.devId}"`);
        res.json(200,"Developer table has been Updated....");
    } catch (error) {
        res.send(500,"something went wrong...")
        console.log(error);
    }
}

const postlogin = async (req,res,next)=>{
    try {
        const {dev_email, dev_password } =req.body;
        const Checker = await querys(`SELECT * FROM developer WHERE dev_email = "${dev_email}" LIMIT 1`);
        if( Checker.length <1){
            return res.json(404,"Developer is not register....");
        }
        if(Checker[0].isActive <1){
            return res.json(200,"Developer is not active please first make it active");
            
        }
        if(Checker[0].isActive > 0 ){
            Checker[0].isActive = true
        }
        if(Checker[0].dev_email == dev_email && Checker[0].dev_password == dev_password){
            const accessToken = JWT_generator(dev_email);
            
            return res.json(200,{message:"Login successfully....",accessToken: accessToken,data:Checker});
        }
        return res.json(403,"Email or password is wrong");
    } catch (error) {
        console.error(error);
        
    }
}

const getteamWithDev =async (req,res)=>{
    try {
        // const data = await querys(`SELECT team_name FROM teams JOIN developer ON team_id = team_id`);
        const data = await querys(`SELECT dev_name, team_name FROM developer JOIN teams ON developer.team_id = teams.team_id`);
        res.send(data)
    } catch (error) {
        console.log(error);
    }
}

const getDevWithteam =async (req,res)=>{
    try {
        const data = await querys(`SELECT developer.dev_name, teams.team_name FROM developer INNER JOIN teams ON developer.team_id = teams.team_id WHERE dev_email = "${req.params.email}" `);
        res.send(data)
    } catch (error) {
        console.log(error);
    }
}

const getDevSortDOB =async (req,res)=>{
    try {

        const data = await querys(`SELECT developer.dev_name, developer.dob FROM developer ORDER BY  developer.dob ASC `);
        res.send(data)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addDeveloper,
    updateTeam,
    postlogin,
    getDevWithteam,
    getteamWithDev,
    getDevSortDOB
}