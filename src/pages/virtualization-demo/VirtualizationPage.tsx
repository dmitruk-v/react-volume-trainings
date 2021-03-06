import React, { PropsWithChildren } from "react";
import { HugeList } from "../../features/virtualization-demo/HugeList";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const VirtualizationPage = (props: PropsWithChildren<Props>) => {
  return (
    <div className="huge-list-screen">
      <HugeList
        height={500}
        itemHeight={100}
        rowBilder={(item, index) => {
          return <div>bla</div>;
        }}
      />
    </div>
  );
}

export { VirtualizationPage };