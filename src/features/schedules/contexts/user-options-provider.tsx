import React, { PropsWithChildren } from "react";
import { AppOptionsModel } from "../../options/options-types";

const UserOptionsContext = React.createContext<AppOptionsModel | null>(null);

type Props = {}

const UserOptionsProvider = (props: PropsWithChildren<Props>) => {
  return (
    <UserOptionsContext.Provider value={null}>
      {props.children}
    </UserOptionsContext.Provider>
  );
}

