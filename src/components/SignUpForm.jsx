import { useState } from "react";


const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if(username === `` || password === ``) {
      setError("Fill username AND password");
      return;
    }

    try{

      const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const result = await response.json();
      setToken(result.token);


    } catch(error) {
      setError(error.message);
    }
  }


  return (
    <>
      <h3>Sign Up</h3>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        Username:
        <input
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        Password:
        <input
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button>Submit</button>

      </form>
    </>
  )
}

export default SignUpForm;