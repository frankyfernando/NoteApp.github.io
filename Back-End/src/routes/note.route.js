const express = require('express')
const routes = express.Router()
const noteControllers = require('../controllers/note.controllers')
routes.post("/", noteControllers.login)
routes.post("/layout/createnote", noteControllers.createNote)
routes.post("/layout/acara", noteControllers.Acara)
routes.delete("/layout/acara/:id", noteControllers.DeleteAcara)
routes.post("/signup", noteControllers.SignUp)
module.exports = routes