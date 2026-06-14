// cartIntegration.test.jsx
// INTEGRATION TEST — adding a product updates the cart.
// Renders a ProductCard together with a live cart summary that reads
// from the same Redux store, simulates a click, and asserts the change.
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { selectCartCount, selectCartTotal } from './cartSlice'
import ProductCard from './ProductCard'

const product = {
  id: 7,
  title: 'Integration Shirt',
  price: 25,
  category: 'apparel',
  description: 'integration test product',
  image: 'https://example.com/shirt.jpg',
  rating: { rate: 4, count: 2 },
}

// A small live view of the cart, connected to the same store.
function CartSummary() {
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="total">{total.toFixed(2)}</span>
    </div>
  )
}

beforeEach(() => {
  sessionStorage.clear()
})

test('the cart updates when a product is added', () => {
  const store = configureStore({ reducer: { cart: cartReducer } })

  render(
    <Provider store={store}>
      <ProductCard product={product} />
      <CartSummary />
    </Provider>
  )

  // Cart starts empty
  expect(screen.getByTestId('count')).toHaveTextContent('0')
  expect(screen.getByTestId('total')).toHaveTextContent('0.00')

  // User adds the product to the cart
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }))

  // Cart reflects the change
  expect(screen.getByTestId('count')).toHaveTextContent('1')
  expect(screen.getByTestId('total')).toHaveTextContent('25.00')

  // Adding again increases the quantity and total
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }))
  expect(screen.getByTestId('count')).toHaveTextContent('2')
  expect(screen.getByTestId('total')).toHaveTextContent('50.00')
})
