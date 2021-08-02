import React, { PropsWithChildren, useContext, useState } from "react";
import { CYCLES } from "../../../constants";
import { Cycle } from "../../../store/types";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { copyModeEnableAction, copyModeDisableAction } from "../../../store/actions";
import { WeekCopyModeContext, weekCopyModeDefault } from "../../../contexts";

// ASSETS ------------------------------------------------------------
import icoCycle from "../../../assets/svg/settings_backup_restore_black_24dp.svg";
import icoCancel from "../../../assets/svg/close_black_24dp.svg";
import icoCopy from "../../../assets/svg/content_copy_black_24dp.svg";
import icoPaste from "../../../assets/svg/arrow_downward_black_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./year-week-header.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Dropdown } from "../../common/dropdown/dropdown";
// -------------------------------------------------------------------

type Props = {
  year: string,
  weekId: string,
  weekNum: number,
  weekCycle: Cycle,
  onCycleChange: (cycle: Cycle) => void,
  onWeekCopy: (fromWeekYear: string, fromWeekId: string, toWeekYear: string, toWeekId: string) => void,
};

const YearWeekHeader = (props: PropsWithChildren<Props>) => {

  const copyMode = useAppSelector(state => state.copyMode);
  const [cycleMenuOpened, setCycleMenuOpened] = useState(false);
  const dispatch = useAppDispatch();
  const weekCopyModeContext = useContext(WeekCopyModeContext);

  const handleCycleChange = (cycle: Cycle) => {
    props.onCycleChange(cycle);
  }

  const handleCopyButtonClick = () => {
    weekCopyModeContext.setWeekCopyMode({
      ...weekCopyModeContext,
      fromWeekYear: props.year,
      fromWeekId: props.weekId,
      isEnabled: true,
    });
    // dispatch(copyModeEnableAction(props.year, props.weekId));
  }

  const handlePasteButtonClick = () => {
    weekCopyModeContext.setWeekCopyMode({
      ...weekCopyModeContext,
      toWeekYear: props.year,
      toWeekId: props.weekId,
      isEnabled: false,
    });
    // props.onWeekCopy(copyMode.fromWeekYear, copyMode.fromWeekId, props.year, props.weekId);
    // dispatch(copyModeDisableAction());
  }

  const handleCancelCopyButtonClick = () => {
    weekCopyModeContext.setWeekCopyMode({ ...weekCopyModeDefault });
    // dispatch(copyModeDisableAction());
  }

  // const renderCopyButton = () => {
  //   if (copyMode.modeState) {
  //     if (copyMode.fromWeekId !== props.weekId) {
  //       return (
  //         <button
  //           className="button-type1 t-year-week__menu-button t-year-week__menu-button--choose"
  //           onClick={handlePasteButtonClick}
  //           title="Paste copied week here"
  //         >
  //           <img src={icoPaste} alt="ico-paste" />
  //         </button>
  //       );
  //     }
  //     return (
  //       <button
  //         className="button-type1 t-year-week__menu-button t-year-week__menu-button--cancel"
  //         onClick={handleCancelCopyButtonClick}
  //         title="Cancel copy"
  //       >
  //         <img src={icoCancel} alt="ico-cancel-copy" />
  //       </button>
  //     );
  //   }
  //   return (
  //     <button
  //       className="button-type1 t-year-week__menu-button"
  //       onClick={handleCopyButtonClick}
  //       title="Copy this week"
  //     >
  //       <img src={icoCopy} alt="ico-copy" />
  //     </button>
  //   )
  // }

  const renderCopyButton = () => {
    if (weekCopyModeContext.isEnabled) {
      if (weekCopyModeContext.fromWeekId !== props.weekId) {
        return (
          <button
            className="button-type1 t-year-week__menu-button t-year-week__menu-button--choose"
            onClick={handlePasteButtonClick}
            title="Paste copied week here"
          >
            <img src={icoPaste} alt="ico-paste" />
          </button>
        );
      }
      return (
        <button
          className="button-type1 t-year-week__menu-button t-year-week__menu-button--cancel"
          onClick={handleCancelCopyButtonClick}
          title="Cancel copy"
        >
          <img src={icoCancel} alt="ico-cancel-copy" />
        </button>
      );
    }
    return (
      <button
        className="button-type1 t-year-week__menu-button"
        onClick={handleCopyButtonClick}
        title="Copy this week"
      >
        <img src={icoCopy} alt="ico-copy" />
      </button>
    )
  }

  return (
    <>
      <div style={{ position: "absolute", left: "50px", zIndex: 9, wordBreak: "break-all", backgroundColor: "#fff" }}>{JSON.stringify(weekCopyModeContext)}</div>
      <div className="t-year-week__header">
        <div className="t-year-week__number">{props.weekNum}</div>
        {renderCopyButton()}
        <button className="button-type1 t-year-week__menu-button" onClick={() => setCycleMenuOpened(true)}>
          <img src={icoCycle} alt="ico-cycle" />
        </button>
      </div>

      <Dropdown
        isOpened={cycleMenuOpened}
        classNames={"t-year-week__dropdown"}
        onClose={() => setCycleMenuOpened(false)}
      >
        <div className="dropdown-title">Cycle type:</div>
        <div className="dropdown-menu">
          <ul className="dropdown-menu__list">
            {CYCLES.map(cycle => (
              <li key={cycle} className="dropdown-menu__item">
                <button
                  className={`dropdown-menu__button ${cycle === props.weekCycle ? "dropdown-menu__button--active" : ""}`}
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

export { YearWeekHeader };