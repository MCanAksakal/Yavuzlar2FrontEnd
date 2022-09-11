import { useEffect, useState } from "react";
import Logo from "../../src/Assets/yavuzlar.png";
import BackgroundImage from "../../src/Assets/Background.svg";
import Modal from "react-modal";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Profile() {
  const { state } = useLocation();
  console.log(state);
  const navigateTo = useNavigate();
  const [todos, setTodos] = useState([]);
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskPerson, setTaskPerson] = useState("");
  const [taskNameEdit, setTaskNameEdit] = useState("");
  const [taskStatusEdit, setTaskStatusEdit] = useState("");
  const [taskPersonEdit, setTaskPersonEdit] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
  const [editId, setEditId] = React.useState("");

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    let InsertAPIUrl =
      "https://yavuzlar2backend.herokuapp.com/api/GetToken.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      id: sessionStorage.getItem("id"),
    };
    fetch(InsertAPIUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0] == "Success") {
          if (token != response[1][0][0]) {
            navigateTo("/");
          }
        } else if (response[0] == "Failure") {
          alert("Operation Failed");
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
        navigateTo("/");
      });
  }, []);

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };
  const handleTaskStatus = (event) => {
    setTaskStatus(event.target.value);
  };
  const handleTaskPerson = (event) => {
    setTaskPerson(event.target.value);
  };

  const handleTaskNameEdit = (event) => {
    setTaskNameEdit(event.target.value);
  };
  const handleTaskStatusEdit = (event) => {
    setTaskStatusEdit(event.target.value);
  };
  const handleTaskPersonEdit = (event) => {
    setTaskPersonEdit(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openEditModal(id, name, status, person) {
    setEditId(id);
    setTaskNameEdit(name);
    setTaskStatusEdit(status);
    setTaskPersonEdit(person);
    setIsOpenEdit(true);
  }

  function closeEditModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    let userid = sessionStorage.getItem("username");
    let InsertAPIUrl =
      "https://yavuzlar2backend.herokuapp.com/api/GetProfileData.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      id: userid,
    };
    fetch(InsertAPIUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0] == "Success") {
          setTodos(Object.assign(response[1]));
        } else if (response[0] == "Failure") {
          alert("Operation Failed");
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
  }, []);

  useEffect(() => {
    let InsertAPIUrl =
      "https://yavuzlar2backend.herokuapp.com/api/GetPersons.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      table: "users",
    };
    fetch(InsertAPIUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0] == "Success") {
          setPersons(Object.assign(response[1]));
        } else if (response[0] == "Failure") {
          alert("Operation Failed");
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
  }, []);

  function AddTask() {
    let name = taskName;
    let status = taskStatus;
    let person = taskPerson;
    let InsertAPIUrl = "https://yavuzlar2backend.herokuapp.com/api/AddTask.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      name: name,
      status: status,
      person: person,
    };
    fetch(InsertAPIUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0] == "Success") {
          alert("Task Created Successfully");
        } else if (response[0] == "Failure") {
          alert("Couldn't Create Task");
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
    navigateTo(0);
  }

  function RemoveTask(id) {
    let taskId = id;
    let InsertAPIUrl =
      "https://yavuzlar2backend.herokuapp.com/api/RemoveTask.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      taskId: taskId,
    };
    fetch(InsertAPIUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0] == "Success") {
          alert("To-Do Deleted");
        } else if (response[0] == "Failure") {
          alert("Operation Failed");
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
    navigateTo(0);
  }

  function EditTask() {
    let taskId = editId;
    let name = taskNameEdit;
    let status = taskStatusEdit;
    let person = taskPersonEdit;
    let InsertAPIUrl =
      "https://yavuzlar2backend.herokuapp.com/api/EditTask.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = {
      taskId: taskId,
      name: name,
      status: status,
      person: person,
    };
    fetch(InsertAPIUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0] == "Success") {
          alert("To-Do Edited");
        } else if (response[0] == "Failure") {
          alert("Operation Failed");
        }
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
    navigateTo(0);
  }

  function Logout() {
    sessionStorage.removeItem("username", "");
    sessionStorage.removeItem("id", "");
    sessionStorage.setItem("token", "");
    navigateTo("/");
  }

  document.body.style.backgroundImage = "url(" + BackgroundImage + ")";

  return (
    <div>
      <div className="w-2/3 m-auto pb-24">
        <div className="pt-6">
          <div className="flex justify-between w-full">
            <div className="item w-auto h-auto">
              <div className="flex justify-center">
                <a href="/home">
                  <div className="w-24">
                    <img
                      className="max-w-full h-auto"
                      src={Logo}
                      alt="image description"
                    />
                  </div>
                </a>
                <a href="/home">
                  <h1 className="w-full mt-4 ml-8 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-200 md:text-5xl lg:text-6xl">
                    To-Do List
                  </h1>
                </a>
              </div>
            </div>
            <div className="item w-auto h-auto flex flex-col justify-center items-center">
              <a href="/profile">
                <div className="inline-flex overflow-hidden relative justify-center items-center w-12 h-12 bg-gray-100 rounded-full border border-gray-600 dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {sessionStorage.length != 0
                      ? sessionStorage
                          .getItem("username")
                          .substring(0, 1)
                          .toUpperCase()
                      : "null"}
                  </span>
                </div>
              </a>
              <h4 className="w-full text-center text-base font-bold tracking-tight leading-none text-gray-200 md:text-lg lg:text-xl">
                {sessionStorage.length != 0
                  ? sessionStorage.getItem("username")
                  : "null"}
              </h4>
              <div
                onClick={Logout}
                className="inline-flex cursor-pointer items-center py-2 px-8 text-sm font-medium text-center text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                <svg
                  className="w-6 h-6 pr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Logout
              </div>
            </div>
          </div>
        </div>

        <div className="block mx-4 p-6 mt-12 bg-gray-200 rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-between my-4">
            <div>
              <div
                onClick={openModal}
                className="inline-flex items-center py-2 px-8 text-sm font-medium text-center text-gray-800 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 mr-1.5"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                New To-Do
              </div>
            </div>
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                {sessionStorage.getItem("username")}'s To-Do List
              </h5>
            </div>
            <div>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  value={search}
                  onChange={handleSearch}
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid overflow-hidden grid-cols-3">
            {todos
              .filter((todo) => todo["name"].includes(search))
              .map((todo, key) => {
                return (
                  <div className="flex justify-center items-center">
                    <div
                      key={key}
                      className="box my-4 mx-4 p-6 w-72 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
                    >
                      <div className="flex justify-between">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                          {todo["name"]}
                        </h5>
                        <div className="flex justify-center">
                          <div className="cursor-pointer">
                            <svg
                              className="w-4 h-4 mr-1.5 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              onClick={() =>
                                openEditModal(
                                  todo["id"],
                                  todo["name"],
                                  todo["status"],
                                  todo["person"]
                                )
                              }
                            >
                              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                            </svg>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => RemoveTask(todo["id"])}
                          >
                            <svg
                              className="w-4 h-4 ml-1.5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700">
                        Status: {todo["status"]}
                      </h5>
                      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700">
                        Date: {todo["date"]}
                      </h5>
                      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700">
                        Person: {todo["person"]}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#0e2a47",
              borderRadius: "15px",
            },
          }}
          contentLabel="Example Modal"
        >
          <div className="flex justify-between items-stretch">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-100">
                Add New To-Do
              </h5>
            </div>
            <div></div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-8 h-8 cursor-pointer"
                fill="#f3f4f6"
                onClick={closeModal}
              >
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="mb-6 w-72 mx-36 my-8">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Task Name
              </label>
              <input
                type="text"
                id="name"
                value={taskName}
                onChange={handleTaskName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="mb-6 w-72 mx-36 my-8">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Status
              </label>
              <input
                type="text"
                id="text"
                value={taskStatus}
                onChange={handleTaskStatus}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-72 mx-36 my-8">
              <label
                htmlFor="persons"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Select a person
              </label>
              <select
                id="persons"
                value={taskPerson}
                onChange={handleTaskPerson}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Select a person</option>
                {persons.map((person, key) => {
                  return (
                    <option key={key} value={person["username"]}>
                      {person["username"]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-6 w-72 mx-36 my-8">
              <div
                onClick={AddTask}
                className="flex items-center justify-center py-2 px-8 text-sm font-medium text-center text-gray-100 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 mr-1.5"
                  fill="#f3f4f6"
                >
                  <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                Confirm
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={modalIsOpenEdit}
          onRequestClose={closeEditModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#0e2a47",
              borderRadius: "15px",
            },
          }}
          contentLabel="Example Modal"
        >
          <div className="flex justify-between items-stretch">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-100">
                Edit To-Do
              </h5>
            </div>
            <div></div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-8 h-8 cursor-pointer"
                fill="#f3f4f6"
                onClick={closeEditModal}
              >
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="mb-6 w-72 mx-36 my-8">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Task Name
              </label>
              <input
                type="text"
                id="name"
                value={taskNameEdit}
                onChange={handleTaskNameEdit}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="mb-6 w-72 mx-36 my-8">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Status
              </label>
              <input
                type="text"
                id="text"
                value={taskStatusEdit}
                onChange={handleTaskStatusEdit}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-72 mx-36 my-8">
              <label
                htmlFor="persons"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Select a person
              </label>
              <select
                id="persons"
                value={taskPersonEdit}
                onChange={handleTaskPersonEdit}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Select a person</option>
                {persons.map((person, key) => {
                  return (
                    <option key={key} value={person["username"]}>
                      {person["username"]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-6 w-72 mx-36 my-8">
              <div
                onClick={EditTask}
                className="flex items-center justify-center py-2 px-8 text-sm font-medium text-center text-gray-100 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 mr-1.5"
                  fill="#f3f4f6"
                >
                  <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                Confirm
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
