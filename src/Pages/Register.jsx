import Logo from "../../src/Assets/yavuzlar.png";
import BackgroundImage from "../../src/Assets/Background.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigateTo = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  function InsertUser() {
    let uname = username;
    let pass = password;
    let InsertAPIUrl = "http://localhost:3000/BackEnd/api/InsertUser.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      uname: uname,
      pass: pass,
    };
    fetch(InsertAPIUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0] == "Success") {
          navigateTo("/login");
        } else if (response[0] == "Failure") {
          alert("Register Failed");
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
  }

  return (
    <>
      <div
        style={{ backgroundImage: "url(" + BackgroundImage + ")" }}
        className="flex justify-center items-center h-screen"
      >
        <div className="w-3/5 h-1/2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col justify-center items-center pb-10 w-full h-full">
            <div className="flex justify-center">
              <div className="w-24">
                <img
                  className="max-w-full h-auto"
                  src={Logo}
                  alt="Yavuzlar Logo"
                />
              </div>
              <h1 className="w-full mt-4 ml-8 mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                To-Do List
              </h1>
            </div>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleUsername}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePassword}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  onClick={InsertUser}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already registered?{" "}
                  <a
                    href="/login"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Login your account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
