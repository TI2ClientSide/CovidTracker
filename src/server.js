require("dotenv").config();

require("./configs/mongodb").connectDB().then(()=>{
    console.log(`\x1b[32m(PLAIN) Successfuly connected to database and object storage servers\x1b[0m`);

    const express = require ('express');
    const bodyParser = require ('body-parser');
    const cors = require ('cors');
    const app = express ();

    app.use (bodyParser.json ());
    app.use (cors ());


    app.use("/infetados", require("./routes/infetados-route.js"));
    app.use("/user",require("./routes/user-route.js"))
    
    const port = process.env.PORT || 5000;
    app.listen (port, () => {
    console.log (`\x1b[32m(PLAIN) Server listening on port ${port}\x1b[0m.`);
    });


}).catch(err =>{
    console.error('Cannot connect to database',err.message)
});

