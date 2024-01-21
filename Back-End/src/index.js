const express = require('express');
const app = express();
const port = 3031;
const cors = require('cors')
const noteRoutes = require("./routes/note.route")
app.use(
    cors({
        origin:"http://localhost:3000",
}))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: false,
    })
)
app.use("/", noteRoutes)
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})