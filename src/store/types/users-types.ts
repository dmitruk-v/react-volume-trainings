type UsersModel = {
  [userId: string]: {
    name: string,
    password: string,
    email: string
  }
}

export type { UsersModel };