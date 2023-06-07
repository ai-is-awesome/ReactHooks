// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(name, options = {}, defaultName = '') {
  const {serialize = JSON.stringify, deserialize = JSON.parse} = options
  console.log('name is : ', name)

  const [item, setItem] = React.useState(() => {
    console.log(window.localStorage.getItem(name))
    return deserialize(window.localStorage.getItem(name)) || defaultName
  })

  React.useEffect(() => {
    window.localStorage.setItem(name, serialize(item))
  }, [name, item, serialize])

  return [item, setItem]
}

function Greeting() {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const de = item => {
    if (item === null || item === undefined) {
      return '' // Provide a default value when item is null or undefined
    }
    return parseInt(item, 10)
  }

  const [key, setKey] = React.useState('name')
  console.log('Key is : ', key)

  const se = item => {
    return parseInt(item)
  }
  const [name, setName] = useLocalStorageState(key, {
    deserialize: de,
    serialize: se,
  })
  const n = typeof name

  function handleChange(event) {
    setName(event.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    setKey(key)
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
        <input value={key} onChange={e => setKey(e.target.value)} />
        <button type="submit">Submit key</button>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      {n}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
