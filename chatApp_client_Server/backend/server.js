const express = require("express")
const dotenv = require("dotenv");
const userRouter = require("./router/user.route.js")
const chatRouter = require("./router/chat.route.js")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.js");
const { errorHandler, notFound } = require("./middlewere/errorhandler.js")
const app = express();
dotenv.config({ path: '../env' });
app.use(express.json());
app.use(cookieParser())


app.use("/api/user", userRouter)
app.use("/api/chat", chatRouter)
// app.use(notFound);
// app.use(errorHandler);
const port = process.env.PORT || 4000

connectDB().then(() => {
    var server = app.listen(port, console.log(`server start at port ${port}`));
    const io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000",
        },
    });
    io.on("connection", (socket) => {
        console.log("Connected to socket.io");
        socket.on("setup", (userData) => {
            socket.join(userData._id);
            socket.emit("connected");
        });
    });
    socket.on('join chat', (room) => {
        socket.join(room)
        console.log("User Joined Room: " + room);
    })
}).catch(err => console.log(err))

