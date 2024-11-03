import { useState } from 'react'
import SignUpForm from './components/SignUpForm.jsx'
import Authenticate from './components/Authenticate.jsx'


const App = () => {
  const [token, setToken] = useState(null);


  return (
    <>
      <h1>Not a Malicious Site</h1>
      <h2>Trust Me :)</h2>
      <SignUpForm token={token} setToken={setToken}/>
      <Authenticate token={token}/>
    </>
  )
}

export default App
