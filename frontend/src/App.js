import Header from "./component/header";
import Sideebar from "./component/Sideebar";
import Data from "./component/Data";
import { auth, provider } from "./firebase";
import styled from "styled-components";
import { useState } from "react";

const LoginWrapper = styled.div`
  background-color: #353535;

  padding: 20px;
  width: 400px;
  border-radius: 10px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 300px;
  img {
    width: 100px;
  }
  button {
    width: 100%;
    background: #2ea9cf;
    padding: 10px 20px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 16px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;

    margin-top: 20px;
  }
`;
function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => setUser(user))
      .catch((err) => alert(err));
  };
  return (
    <>
      {user ? (
        <>
          <Header photoURL={user.photoURL} />
          <div className="App">
            <Sideebar />
            <Data />
          </div>
        </>
      ) : (
        <LoginWrapper>
          <img src="/logo.png" alt="logo" />
          <button onClick={signIn}>Login to Nebula</button>
        </LoginWrapper>
      )}
    </>
  );
}

export default App;
