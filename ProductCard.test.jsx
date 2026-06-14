// ProductCard.test.jsx
// UNIT TEST #2 — ProductCard rendering and user interaction.
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { selectCartItems } from './cartSlice'
import ProductCard from './ProductCard'

const product = {
  id: 1,
  title: 'Test Shirt',
  price: 19.99,
  category: "men's clothing",
  description: 'A nice test shirt',
  image: 'https://example.com/shirt.jpg',
  rating: { rate: 4.5, count: 10 },
}

function makeStore() {
  return configureStore({ reducer: { cart: cartReducer } })
}

beforeEach(() => {
  sessionStorage.clear()
})

describe('ProductCard', () => {
  test('renders the product title, price and category', () => {
    render(
      <Provider store={makeStore()}>
        <ProductCard product={product} />
      </Provider>
    )
    expect(screen.getByText('Test Shirt')).toBeInTheDocument()
    expect(screen.getByText('$19.99')).toBeInTheDocument()
    expect(screen.getByText("men's clothing")).toBeInTheDocument()
  })

  test('dispatches addToCart when the button is clicked', () => {
    const store = makeStore()
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    )
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }))

    const items = selectCartItems(store.getState())
    expect(items).toHaveLength(1)
    expect(items[0].title).toBe('Test Shirt')
  })
})
