const moment = require('moment')

const reply = require('./reply')
const schedule = require('./schedule')

function parse(req, res) {
    let event = req.body.events[0]
    let user = event.source.userId
    let text = event.message.text
    let hook = event.replyToken
    let words = text.split(' ')
    if (words[0] == 'add') {
        let time = moment('{} {} +8'.format(words[1], words[2]), 'M/D H:m Z').unix()
        let task = words.slice(3).join(' ')
        schedule.add(user, time, task, hook)
    }
    else if (words[0] == 'get') {
        schedule.get(user, hook)
    }
    else if (words[0] == 'del') {
        let task = words.slice(1).join(' ')
        schedule.del(user, task, hook)
    }
    else {
        reply(user, '?', hook)
    }
    res.sendStatus(200)
}

module.exports = parse