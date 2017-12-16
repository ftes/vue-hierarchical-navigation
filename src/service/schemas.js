const cart = {
  type: 'object',
  required: ['id', 'name', 'amount'],
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid'
    },
    name: {
      type: 'string',
      faker: 'commerce.productMaterial'
    },
    amount: {
      type: 'number',
      faker: 'finance.amount'
    }
  }
}

const item = {
  type: 'object',
  required: ['id', 'name', 'amount'],
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid'
    },
    name: {
      type: 'string',
      faker: 'commerce.product'
    },
    amount: {
      type: 'number',
      format: 'integer',
      faker: {
        'random.number': [10]
      }
    }
  }
}

const items = (limit, items) => ({
  type: 'object',
  required: ['items'],
  properties: {
    items: {
      type: 'array',
      minItems: limit,
      maxItems: limit,
      items
    }
  }
})

module.exports = {
  item,
  cart,
  items
}
