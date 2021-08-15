import React, { PropsWithChildren, useState } from "react";
import { Cycle, TrainingWeekModel } from "../schedules-types";
import { useAppDispatch } from "../../../shared/hooks";
import { useCancelOnEscapeContext } from "../../../shared/contexts";
import { useWeekCopyModeContext } from "../contexts/week-copy-mode-provider";
import { schedulesCopyTrainingWeekAction, schedulesUpdateTrainingWeekAction } from "../schedules-actions";
import { CYCLES } from "../schedules-constants";

// ASSETS ------------------------------------------------------------
import icoCycle from "../../../assets/svg/settings_backup_restore_black_24dp.svg";
import icoCancel from "../../../assets/svg/close_black_24dp.svg";
import icoCopy from "../../../assets/svg/content_copy_black_24dp.svg";
import icoPaste from "../../../assets/svg/arrow_downward_black_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./YearsScheduleWeekHeader.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Dropdown } from "../../../shared/components/Dropdown";
// -------------------------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  weekId: string,
  weekNum: number,
  trainingWeek: TrainingWeekModel,
  onCycleChange: (cycle: Cycle) => void,
};

const YearsScheduleWeekHeader = (props: PropsWithChildren<Props>) => {

  const [cycleMenuOpened, setCycleMenuOpened] = useState(false);
  const dispatch = useAppDispatch();
  const weekCopyModeContext = useWeekCopyModeContext();
  const cancelOnEscapeContext = useCancelOnEscapeContext();

  const handleCycleChange = (cycle: Cycle) => {
    if (props.trainingWeek.cycle === cycle) return;
    dispatch(schedulesUpdateTrainingWeekAction(props.scheduleId, props.year, { ...props.trainingWeek, cycle }));
  }

  const handleCopyButtonClick = () => {
    weekCopyModeContext.setFromAndEnable(props.year, props.weekId);
    cancelOnEscapeContext.setOnEscape({
      onEscape: () => {
        weekCopyModeContext.setDefaultsAndDisable();
      }
    });
  }

  const handlePasteButtonClick = () => {
    const { fromWeekYear, fromWeekId } = weekCopyModeContext;
    dispatch(schedulesCopyTrainingWeekAction(props.scheduleId, fromWeekYear, fromWeekId, props.year, props.weekId));
    weekCopyModeContext.setDefaultsAndDisable();
  }

  const handleCancelCopyButtonClick = () => {
    weekCopyModeContext.setDefaultsAndDisable();
  }

  const renderCopyButton = () => {
    if (weekCopyModeContext.isEnabled) {
      if (weekCopyModeContext.fromWeekId !== props.weekId) {
        return (
          <button
            className="button-type1 ysch-week__menu-button ysch-week__menu-button--choose"
            onClick={handlePasteButtonClick}
            title="Paste copied week here"
          >
            <img src={icoPaste} alt="ico-paste" />
          </button>
        );
      }
      return (
        <button
          className="button-type1 ysch-week__menu-button ysch-week__menu-button--cancel"
          onClick={handleCancelCopyButtonClick}
          title="Cancel copy"
        >
          <img src={icoCancel} alt="ico-cancel-copy" />
        </button>
      );
    }
    return (
      <button
        className="button-type1 ysch-week__menu-button"
        onClick={handleCopyButtonClick}
        title="Copy this week"
      >
        <img src={icoCopy} alt="ico-copy" />
      </button>
    )
  }

  return (
    <>
      <div className="ysch-week__header">
        <div className="ysch-week__number">{props.weekNum}</div>
        {renderCopyButton()}
        <button className="button-type1 ysch-week__menu-button" onClick={() => setCycleMenuOpened(true)}>
          <img src={icoCycle} alt="ico-cycle" />
        </button>
      </div>

      <Dropdown
        isOpened={cycleMenuOpened}
        classNames={"ysch-week__dropdown"}
        onClose={() => setCycleMenuOpened(false)}
      >
        <div className="dropdown-title">Cycle type:</div>
        <div className="dropdown-menu">
          <ul className="dropdown-menu__list">
            {CYCLES.map(cycle => (
              <li key={cycle} className="dropdown-menu__item">
                <button
                  className={`dropdown-menu__button ${cycle === props.trainingWeek.cycle ? "dropdown-menu__button--active" : ""}`}
                  onClick={() => handleCycleChange(cycle)}
                >{cycle}</button>
              </li>
            ))}
          </ul>
        </div>
      </Dropdown>
    </>
  );
}

export { YearsScheduleWeekHeader };