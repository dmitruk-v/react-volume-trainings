import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, changeScheduleSpreadReps, changeScheduleSpreadWeight } from "../../store";
import { DAYS_OF_WEEK } from "../../constants";

// STYLES ------------------------------------------
import "./options.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {};

const Options: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();

  const spreadRepsState = useSelector<RootState, boolean>(state => state.appOptions.schedule.spreadReps);
  const spreadWeightState = useSelector<RootState, boolean>(state => state.appOptions.schedule.spreadWeight);

  const handleSpreadRepsCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeScheduleSpreadReps(evt.target.checked)(dispatch));
  }

  const handleSpreadWeightCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeScheduleSpreadWeight(evt.target.checked)(dispatch));
  }

  return (
    <div className="app-options">
      <div className="app-options__form">
        <form className="app-opts-form">

          <div className="app-opts-form__title">UI options</div>

          <div className="app-opts-form__section">
            <div className="app-opts-form__field">
              <div className="app-opts-form__control">
                <label className="app-opts-form__label">Exercises in a row:</label>
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
              <div className="app-opts-form__detail">How many exercises would be placed in the row.</div>
            </div>
          </div>

          <div className="app-opts-form__title">Schedule options</div>

          <div className="app-opts-form__section">
            <div className="app-opts-form__field">
              <div className="app-opts-form__control">
                <label className="app-opts-form__label">Default week day:</label>
                <span className="control-select">
                  <select name="spread-reps" className="control-select__native" onChange={() => { }}>
                    {DAYS_OF_WEEK.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </span>
              </div>
              <div className="app-opts-form__detail">Day that would be active when you navigate to schedule page</div>
            </div>

            <div className="app-opts-form__field">
              <div className="app-opts-form__control">
                <label className="control-checkbox">
                  <input type="checkbox" name="spread-reps" className="control-checkbox__input"
                    onChange={handleSpreadRepsCheckbox}
                    checked={spreadRepsState}
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
                    checked={spreadWeightState}
                  />
                  <span className="control-checkbox__name">Spread weight?</span>
                </label>
              </div>
              <div className="app-opts-form__detail">
                Check to propagate <span className="t-bold">weight</span> value that you typed in to <span className="t-underlined">all next weight fields</span> in that exercise.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
// -----------------------------------------------------------------------------

export default Options;