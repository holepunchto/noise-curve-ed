const Noise = require('noise-handshake')
const test = require('brittle')
const curve = require('./')

test('XX', (t) => {
  const initiator = new Noise('XX', true, null, { curve })
  const responder = new Noise('XX', false, null, { curve })

  initiator.initialise(Buffer.alloc(0))
  responder.initialise(Buffer.alloc(0))

  const message = initiator.send()
  responder.recv(message)

  const reply = responder.send()
  initiator.recv(reply)

  t.alike(initiator.rx, responder.tx)
  t.alike(initiator.tx, responder.rx)
})
