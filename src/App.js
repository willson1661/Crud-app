import React, { useState,useEffect } from "react";
import UserTable from "./tables/UserTable";
import EditUserForm from "./forms/EditUserForm";

const App = () => {
  const usersData = [
 
  ];
  const initialFormState = { id: null, name: "", username: "" };
  const saveditems = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(usersData || saveditems);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      setUsers(users);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);



  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  };

  const editRow = user => {
    setEditing(true);

    setCurrentUser(user);
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD App </h1>
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>{editing ? "Edit user" : "Add user"}</h2>
            <EditUserForm
              editing={editing}
              setEditing={setEditing}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              updateUser={updateUser}
              addUser={addUser}
            />
          </div>
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
