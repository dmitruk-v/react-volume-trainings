// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

import { OtherFetcher } from "./OtherFetcher";
import { OtherRenderProps } from "./OtherRenderProps";

// STYLES ------------------------------------------------------------
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const OtherMain = (props: Props) => {
  return (
    <>
      <OtherRenderProps />
      <OtherFetcher />
    </>
  );
}

export { OtherMain };