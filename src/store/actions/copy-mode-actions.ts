const copyModeEnableAction = (fromWeekYear: string, fromWeekId: string) => {
  return {
    type: "copyMode/enable",
    payload: { fromWeekYear, fromWeekId, modeState: true }
  } as const
}

const copyModeDisableAction = () => {
  return {
    type: "copyMode/disable",
    payload: { modeState: false }
  } as const
}

export type CopyModeActions =
  | ReturnType<typeof copyModeEnableAction>
  | ReturnType<typeof copyModeDisableAction>

export { copyModeEnableAction, copyModeDisableAction }