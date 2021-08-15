// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./OptionsPage.css"
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Options } from "../../features/options";
import { MainLayout } from "../../layouts/MainLayout";
// -------------------------------------------------------------------

type Props = {};

const OptionsPage = (props: Props) => {
  return (
    <MainLayout>
      <Options />
    </MainLayout>
  )
}

export { OptionsPage };