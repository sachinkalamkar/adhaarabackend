const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey : '14a0d539',
    apiSecret : 'Jx5GoH9PJzLQfoop',
})

const from = "Adhaara"
const to = '918793224940'
const text = "Hello, from Adhaara"

nexmo.message.sendSms(from, to, text)