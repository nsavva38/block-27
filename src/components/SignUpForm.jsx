import { useState } from "react";


const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState(null);




  const usernameAndPasswordCheck = () => {

    if(username === `` && password === ``) {
      setError("Fill username AND password");
    }

    else if (username.length < 8 || password.length < 4) {
      setError("Username must be at least 8 characters long\nAnd\nPassword must be at least 4 characters long");
    }

    return;
  }




  const handleSubmit = async (event) => {
    event.preventDefault();

    usernameAndPasswordCheck();


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

      setUsername(``);
      setPassword(``);


    } catch(error) {
      setError(error.message);
    }
  }


  return (
    <>
      <h3>Sign Up</h3>
      {error && <pre>{error}</pre>}

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