const io = require('socket.io')({ path: '/chatserver' })

var history = []

io.on('connection', (client) => {
    client.on('subscribeToMsgs', () => {
        console.log('client is subscribing to messages')
        client.emit('msgs', history)
    })
    client.on('sendMsg', (msg) => {
        console.log(msg)
        if (history.length === 100) history.shift()
        history.push(msg)
        io.emit('msgs', history)
    })
})


const port = 8000
io.listen(port)
console.log('listening on port ', port)