import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext(0);

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function sendDataToSignUp(values) {
    const { data } = await axios.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
      values
    );
    console.log(data);
    return data;
  }
  // !===================================! \\
  async function loginUser(values) {
    const { data } = await axios.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
      values
    );
    console.log(data);
    return data;
  }

  // * functions
  function logOut() {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setToken(null);
    console.log("Logged out");
  }

  return (
    <UserContext.Provider
      value={{ sendDataToSignUp, loginUser, token, setToken, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
}
