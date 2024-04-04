const product = {
    type: 'object',
    properties: {
        // id: { type: 'integer' },
        name: { type: 'string' }
    }
}

export const getProductItem = {
    schema: {
        response: {
            200: product
        }
    }
}

export const getProductItems = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: product
            }
        }
    }
}

