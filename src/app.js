import express from 'express'
import usersRoutes from './routes/user.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express();

app.use(express.json())

app.use(usersRoutes)
app.use(indexRoutes)

app.use((req, res) => {
    res.status(404).json({message: 'Endpoint not found'})
})

export default app;