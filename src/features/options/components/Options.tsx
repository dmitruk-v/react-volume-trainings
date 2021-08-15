import { useParams } from "react-router-dom";
import { WEEK_DAYS } from "../../../shared/constants";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { changeOptionScheduleSpreadReps, changeOptionScheduleSpreadWeight } from "../options-actions";
import { selectOptionsById } from "../options-selectors";
import { AppOptionsModel } from "../options-types";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./Options.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type RouteParams = {
  optionsId: string
}

type Props = {};

const Options = (props: Props) => {

  const dispatch = useAppDispatch();
  const params = useParams<RouteParams>();
  const appOptions = useAppSelector<AppOptionsModel | undefined>(state => selectOptionsById(state, params.optionsId));

  const handleSpreadRepsCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeOptionScheduleSpreadReps(params.optionsId, evt.target.checked)
    );
  }

  const handleSpreadWeightCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeOptionScheduleSpreadWeight(params.optionsId, evt.target.checked)
    );
  }

  if (appOptions === undefined) {
    return <div>Schedule (scheduleId: {params.optionsId}) not found.</div>
  }

  return (
    <div className="app-options">
      <div className="app-options__form">
        <form className="app-opts-form">

          <div className="app-opts-form__title">Schedule generator options</div>
          <div className="app-opts-form__section">
            <div className="app-opts-form__field">
              <div className="app-opts-form__control app-opts-form__control">
                <div className="small-cols">
                  <div className="small-cols__col">
                    <input type="text" value={1} onChange={() => { }} className="control-input" />
                  </div>
                  <div className="small-cols__col">
                    <input type="text" value={6} onChange={() => { }} className="control-input" />
                  </div>
                  <div className="small-cols__col">
                    <input type="text" value={3} onChange={() => { }} className="control-input" />
                  </div>
                </div>
              </div>
              <div className="app-opts-form__detail">
                <p>Configuration of generated schedule:</p>
                <ol>
                  <li>Number of trainings in training day</li>
                  <li>Number of exercises in training</li>
                  <li>Number of sets in exercise</li>
                </ol>
              </div>
            </div>
            <div className="app-opts-form__field">
              <div className="app-opts-form__control">
                <span className="control-select">
                  <select name="spread-reps" className="control-select__native" onChange={() => { }}>
                    {WEEK_DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </span>
              </div>
              <div className="app-opts-form__detail">Default week day. Day that would be active when you navigate to schedule page</div>
            </div>
          </div>

          <div className="app-opts-form__title">Schedule editor options</div>
          <div className="app-opts-form__section">
            <div className="app-opts-form__field">
              <div className="app-opts-form__control">
                <label className="control-checkbox">
                  <input type="checkbox" name="spread-reps" className="control-checkbox__input"
                    onChange={handleSpreadRepsCheckbox}
                    checked={appOptions.options.schedule.spreadReps}
                  />
                  <span className="control-checkbox__name">Spread reps?</span>
                </label>
              </div>
              <div className="app-opts-form__detail">
                Check to propagate <span className="t-bold">reps</span> value that you typed in to <span className="t-underlined">all next reps fields</span> in that exercise.
              </div>
            </div>

            <div className="app-opts-form__field">
              <div className="app-opts-form__control">
                <label className="control-checkbox">
                  <input type="checkbox" name="spread-weight" className="control-checkbox__input"
                    onChange={handleSpreadWeightCheckbox}
                    checked={appOptions.options.schedule.spreadWeight}
                  />
                  <span className="control-checkbox__name">Spread weight?</span>
                </label>
              </div>
              <div className="app-opts-form__detail">
                Check to propagate <span className="t-bold">weight</span> value that you typed in to <span className="t-underlined">all next weight fields</span> in that exercise.
              </div>
            </div>
          </div>

          <div className="app-opts-form__title">UI options</div>
          <div className="app-opts-form__section">
            <div className="app-opts-form__field">
              <div className="app-opts-form__control">
                <span className="control-select">
                  <select
                    name="row-exercises"
                    className="control-select__native"
                    onChange={() => { }}
                    value={3}>
                    {Array.from({ length: 5 }, (_, idx) => <option key={idx} value={idx + 1}>{idx + 1}</option>)}
                  </select>
                </span>
              </div>
              <div className="app-opts-form__detail">Exercises in a row. How many exercises would be placed in the row.</div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
// -----------------------------------------------------------------------------

export { Options };