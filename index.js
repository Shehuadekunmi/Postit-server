require("dotenv").config();
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const storyRouter = require("./routes/storyRouter")
const auth = require("./middleware/auth")
const fileupload = require("express-fileupload")
const cloudinary = require("cloudinary").v2
const cors = require("cors")
const rateLimit = require("express-rate-limit")

// CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
     
// middelware
app.use(express.json());
app.use(fileupload({useTempFiles: true}));
app.use(cors())
// app.use(rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP address
// })) we dont need it on this project

// routes
app.use("/api/v1", authRouter)
app.use("/api/v1/story", auth, storyRouter);


// db coonection
const startServer = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server running on port ${port}..`);
        })
    } catch (error) {
        console.log(error);
    }
}
startServer();

app.use((req, res) => {
    res.status(404).json({message: 'Resource not found'})
})