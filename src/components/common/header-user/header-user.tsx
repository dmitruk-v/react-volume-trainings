import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/common";
import { selectUserById } from "../../../store/selectors";
import { UserModel } from "../../../store/types";
import { Users } from "../../users/users";
import { Modal } from "../modal/modal";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./header-user.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  selectedUserId: string
};

const HeaderUser: React.FC<Props> = (props) => {

  console.log("HeaderUser called", props.selectedUserId);

  const [usersModalOpened, setUsersModalOpened] = useState(false);
  const selectedUser = useAppSelector<UserModel | undefined>(state => selectUserById(state, props.selectedUserId));

  useEffect(() => {
    if (props.selectedUserId.length === 0) {
      setUsersModalOpened(true);
    }
  }, [props.selectedUserId]);

  return (
    <>
      <div
        className={`header-user ${selectedUser ? "header-user--active" : ""}`}
        onClick={() => setUsersModalOpened(true)}
      >
        {selectedUser ? selectedUser.name : "Select user"}
      </div>
      <Modal opened={usersModalOpened} onClose={() => {
        console.log("--- modal close called ---");
        setUsersModalOpened(false);
      }}>
        <Users />
      </Modal>
    </>
  );
}

export { HeaderUser };