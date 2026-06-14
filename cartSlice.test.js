// cartSlice.test.js
// UNIT TEST #1 — cart reducer logic (state changes).
import cartReducer, {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartCount,
  selectCartTotal,
} from './cartSlice'

const productA = { id: 1, title: 'Shirt', price: 10, image: '' }
const productB = { id: 2, title: 'Hat', price: 5, image: '' }

describe('cart reducer', () => {
  test('adds a new product with quantity 1', () => {
    const state = cartReducer(undefined, addToCart(productA))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].id).toBe(1)
    expect(state.items[0].quantity).toBe(1)
  })

  test('increments quantity when the same product is added again', () => {
    let state = cartReducer(undefined, addToCart(productA))
    state = cartReducer(state, addToCart(productA))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
  })

  test('removes a product from the cart', () => {
    let state = cartReducer(undefined, addToCart(productA))
    state = cartReducer(state, removeFromCart(1))
    expect(state.items).toHaveLength(0)
  })

  test('decrementing to zero removes the product', () => {
    let state = cartReducer(undefined, addToCart(productA))
    state = cartReducer(state, decrementQuantity(1))
    expect(state.items).toHaveLength(0)
  })

  test('clearCart empties the cart', () => {
    let state = cartReducer(undefined, addToCart(productA))
    state = cartReducer(state, addToCart(productB))
    state = cartReducer(state, clearCart())
    expect(state.items).toHaveLength(0)
  })

  test('selectors compute total count and total price', () => {
    let state = cartReducer(undefined, addToCart(productA)) // 1 x $10
    state = cartReducer(state, addToCart(productA)) // 2 x $10
    state = cartReducer(state, addToCart(productB)) // + 1 x $5
    const root = { cart: state }
    expect(selectCartCount(root)).toBe(3)
    expect(selectCartTotal(root)).toBe(25)
  })
})
