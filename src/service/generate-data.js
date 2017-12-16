const jsf = require('json-schema-faker')
const { cart, item } = require('./schemas')
const fs = require('fs')

const carts = {
  type: 'array',
  minItems: 12,
  maxItems: 12,
  items: {
    ...cart,
    required: [...cart.required, 'items'],
    properties: {
      ...cart.properties,
      items: {
        type: 'array',
        minItems: 1,
        maxItems: 20,
        items: item
      }
    }
  }
}

const object = jsf(carts)
const string = JSON.stringify(object, null, 2)
fs.writeFile('src/service/data.json', string, (e) => {
  if (e) console.error('Error', e)
  else console.log('Success')
});
