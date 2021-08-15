import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../shared/hooks";
import { UserModel } from "../users-types";
import { selectUserById } from "../users-selectors";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./UserSelector.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Modal } from "../../../shared/components/Modal";
import { UsersList } from "./UsersList";
// -------------------------------------------------------------------

type Props = {};

const UserSelector = (props: Props) => {

  console.log("UserSelector called");

  const selectedUser = useAppSelector<UserModel | null>(state => state.selectedUser);
  const [usersModalOpened, setUsersModalOpened] = useState(false);

  useEffect(() => {
    if (!selectedUser) setUsersModalOpened(true);
  }, [selectedUser]);

  const closeModal = () => {
    console.log("--- modal close called ---");
    setUsersModalOpened(false);
  }

  let classNames = "";
  if (selectedUser) classNames += " user-selector--active";

  return (
    <>
      <div className={`user-selector ${classNames}`} onClick={() => setUsersModalOpened(true)}>
        {selectedUser ? selectedUser.name : "Select user"}
      </div>
      <Modal opened={usersModalOpened} onClose={closeModal}>
        <UsersList />
      </Modal>
    </>
  );
}

export { UserSelector };