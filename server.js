// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//     console.log('Hello W!');

//     res.write("oi")
// })

// server.listen(3333)

import { fastify } from "fastify"
// import { DataBaseMomory } from "./database-memo.js"
import { DataBasePostgres } from "./database-postgres.js"

const server = fastify()

// const database = new DataBaseMomory()
const database = new DataBasePostgres()

server.post('/videos', async (request, reply) => {
    const {
        title,
        description,
        duration
    } = request.body


    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()

})

server.get('/videos', async (request) => {

    const { search } = request.query

    console.log(search);

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, replay) => {
    const { id } = request.params
    const { title, description, duration } = request.body

    await database.update(id, {
        title, description, duration
    })

    return replay.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const { id } = request.params

    await database.delete(id)

    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3131,
})