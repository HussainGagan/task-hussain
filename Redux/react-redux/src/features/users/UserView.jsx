import React, { useEffect } from "react";
import { fetchUsers } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserView() {
  console.log("user");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <h2>List of Users</h2>
      {user.loading && <h2>Loading...</h2>}
      {!user.loading && user.error && <h2>{user.error}</h2>}
      {!user.loading && user.users && (
        <ul>
          {user.users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
