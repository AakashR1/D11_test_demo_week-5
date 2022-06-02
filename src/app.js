const express = require('express');
const app = express();
const teamRouter = require('./router/teamRouter');
const developerRouter = require('./router/devRouter');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/team',teamRouter);
app.use('/developer',developerRouter);




app.listen(3000,(err)=>{
    if(err) throw err;
    console.log(`server is listening at port ${3000}`);
})
