import { useState } from "react";


const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState(null);




  const inputCheck = () => {

    const usernameLength = 4;
    const passwordLength = 4;

    if(username === `` && password === ``) {
      setError("Fill username AND password");
      return false;
    }

    else if (username.length < usernameLength || password.length < passwordLength) {
      setError(`Username must be at least ${usernameLength} characters long\nAnd\nPassword must be at least ${passwordLength} characters long`);
      return false;
    }

    setError(`Submitted`);
    return true;
  }




  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!inputCheck()){
      return;
    };


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