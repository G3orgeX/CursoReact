import React from 'react'
import { useCounter } from '../hooks/useCounter'

export const CounterWithCustomHooks = () => {

    const { counter,incremento,decrement,reset } = useCounter();

  return (
 <>
 <h1>Counter with hook: { counter }</h1>
 <hr/>
 <button className="btn btn-primary" onClick={incremento}>+1</button>
 <button className="btn btn-primary"onClick={reset}>Reset</button>
 <button className="btn btn-primary" onClick={decrement}>-1</button>
 </>
  )
}
