const selectedUserActivate = (userId: string) => {
  return {
    type: "selectedUser/activate",
    payload: { userId }
  } as const;
}

type SelectedUserActions = ReturnType<typeof selectedUserActivate>;

export type { SelectedUserActions };
export {
  selectedUserActivate
}