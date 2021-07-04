import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, changeOptionScheduleSpreadReps, changeOptionScheduleSpreadWeight } from "../../store";
import { WEEK_DAYS } from "../../constants";

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
    dispatch(
      changeOptionScheduleSpreadReps(evt.target.checked)
    );
  }

  const handleSpreadWeightCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeOptionScheduleSpreadWeight(evt.target.checked)
    );
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
          </div>

          <div className="app-opts-form__title">Schedule editor options</div>
          <div className="app-opts-form__section">
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

export default Options;