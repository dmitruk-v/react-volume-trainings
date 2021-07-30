import React, { PropsWithChildren, useState } from "react";
import { CYCLES } from "../../../constants";
import { Cycle } from "../../../store/types";

// ASSETS ------------------------------------------------------------
import icoCycle from "../../../assets/svg/settings_backup_restore_black_24dp.svg";
import icoCopy from "../../../assets/svg/content_copy_black_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Dropdown } from "../../common/dropdown/dropdown";
// -------------------------------------------------------------------

type Props = {
  weekNum: number,
  weekCycle: Cycle,
  onCycleChange: (cycle: Cycle) => void,
  onWeekCopy: (fromWeekId: string) => void,
};

const YearWeekHeader = (props: PropsWithChildren<Props>) => {
  const [cycleMenuOpened, setCycleMenuOpened] = useState(false);
  const [copyMenuOpened, setCopyMenuOpened] = useState(false);

  const handleCycleChange = (cycle: Cycle) => {
    props.onCycleChange(cycle);
    setCopyMenuOpened(false);
  }

  const handleWeekCopy = (fromWeekId: string) => {
    props.onWeekCopy(fromWeekId);
    setCopyMenuOpened(false);
  }

  return (
    <>
      <div className="t-year-week__header">
        <div className="t-year-week__number">{props.weekNum}</div>
        <button className="button-type1 t-year-week__menu-button" onClick={() => setCopyMenuOpened(true)}>
          <img src={icoCopy} alt="ico-menu" />
        </button>
        <button className="button-type1 t-year-week__menu-button" onClick={() => setCycleMenuOpened(true)}>
          <img src={icoCycle} alt="ico-cycle" />
        </button>
      </div>

      <Dropdown
        isOpened={copyMenuOpened}
        classNames={"t-year-week__dropdown"}
        withCloseBtn
        onClose={() => setCopyMenuOpened(false)}
      >
        <div className="dropdown-title">Copy from:</div>
        <div className="dropdown-form">
          <div className="control-select">
            <select onChange={(evt) => handleWeekCopy(evt.target.value)} className="control-select__native">
              <option key={-1} value="">Select week</option>
              {/* {props.weeks.map((w, idx) => (
                <option key={w.weekId} value={w.weekId}>{idx + 1}</option>
              ))} */}
            </select>
          </div>
        </div>
      </Dropdown>

      <Dropdown
        isOpened={cycleMenuOpened}
        classNames={"t-year-week__dropdown"}
        withCloseBtn
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