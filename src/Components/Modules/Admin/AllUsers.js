import React, { useEffect, useState } from "react";
import Sidebar from "../../library/Sidebar";
import Select from "react-select";
import axios from "axios";
import { useUser } from "../../../Provider/UserProvider";
import FormInput from "../../Form/FormInput";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import UsersInfo from "./UsersInfo";
import AddUserModal from "../../library/AddUserModal";
import ShowJoiningKeyModal from "../../library/ShowJoiningKeyModal";
import ShowModal from "../../library/ShowModal";
import Loader from "../../library/Loader";
import Container from "../../library/Container";

const AllUsers = () => {
  const { userDetails } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [addUserFlag, setAddUserFlag] = useState(false);
  const [showJoiningKeyFlag, setShowJoiningKeyFlag] = useState(false);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [joiningKey, setJoiningKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getEmployees();
  }, [userDetails]);

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/all`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      const data = res.data.users;
      console.log(data);
      setAllUsers(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const showAddUserModal = () => {
    setAddUserFlag(true);
    setShowJoiningKeyFlag(false);
    setRemoveFlag(false);
  };

  const hideAddUserModal = () => {
    setAddUserFlag(false);
    setShowJoiningKeyFlag(false);
    setRemoveFlag(false);
  };

  const hideModal = () => {
    setAddUserFlag(false);
    setShowJoiningKeyFlag(false);
    setRemoveFlag(false);
  };

  const showRemoveUserModal = (data) => {
    setUser(data);
    setAddUserFlag(false);
    setShowJoiningKeyFlag(false);
    setRemoveFlag(true);
  };

  const addNewUser = async (params) => {
    let reqData = {
      email: params.email,
    };
    console.log(reqData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/user/create-user`,
        {
          ...reqData,
        },
        {
          headers: { Authorization: `Bearer ${userDetails.userState.token}` },
        }
      );
      console.log(res);
      setJoiningKey(res.data.joiningId);
      setShowJoiningKeyFlag(true);
      setAddUserFlag(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    console.log(user);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/user/delete/${user.id}`,
        {
          headers: { Authorization: `Bearer ${userDetails.userState.token}` },
        }
      );
      const data = res.data.user;
      console.log(data);
      hideModal();
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Sidebar />
      {isLoading ? (
        <div style={{ height: "35rem" }}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className="offset-md-11 pr-0 mt-3"></div>
          <div className="mt-5">
            <h3 className="users-count-text">
              All Users
              <span className="task-count-circle">{allUsers.length}</span>
            </h3>
            <div
              className="offset-md-11 pr-0 add-user-btn"
              onClick={showAddUserModal}
            >
              <IconContext.Provider value={{ size: "2rem" }}>
                <span>
                  <AiOutlinePlus className="plus-icon" />{" "}
                </span>
                <span className="plus-icon-text">User</span>
              </IconContext.Provider>
            </div>
          </div>
          {allUsers.map((user) => {
            return (
              <UsersInfo
                userName={user.name}
                assigned={user.taskAssigned}
                inProgress={user.taskInProgress}
                completed={user.taskCompleted}
                empId={user.employeeId}
                id={user._id}
                showRemoveUserModal={showRemoveUserModal}
              />
            );
          })}
          {addUserFlag && (
            <AddUserModal
              text={"Enter email id of the user you want to add"}
              addUser={addNewUser}
              hideAddUserModal={hideAddUserModal}
            />
          )}
          {showJoiningKeyFlag && (
            <ShowJoiningKeyModal text={`User Joining Key is ${joiningKey}`} />
          )}
          {removeFlag && (
            <ShowModal
              user={user}
              text={`Are you sure you want to remove ${user.name}?`}
              resultText={"User removed successfully!"}
              hideModal={hideModal}
              handleChange={deleteUser}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default AllUsers;
