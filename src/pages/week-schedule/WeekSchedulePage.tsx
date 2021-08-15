// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./WeekSchedulePage.css"
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { WeekSchedule } from "../../features/schedules";
import { MainLayout } from "../../layouts/MainLayout";
// -------------------------------------------------------------------

type Props = {};

const WeekSchedulePage = (props: Props) => {
  return (
    <MainLayout>
      <WeekSchedule />
    </MainLayout>
  );
}

export { WeekSchedulePage };