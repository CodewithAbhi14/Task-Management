const express = require("express");
const dotend = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose")
const taskRouter = require('./routes/task.routes.js')
const adminRouter = require('./routes/admin.routes.js')
const userRouter = require('./routes/user.routes.js')

dotend.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Task Management System Backend API...!!!!");
});
app.use('/api/tasks', taskRouter)
app.use('/api/users', userRouter)
app.use('/api/admin', adminRouter)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOURI).then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
      });
    console.log("connected to database...!!!")
}).catch((err)=>{
    console.log(err)
})


