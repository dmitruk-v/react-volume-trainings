// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./SelectField.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  items: string[],
  defaultValue: string,
  onChange: (T: string) => void
};

const SelectField = (props: Props) => {
  return (
    <div className="control-select">
      <select
        className="control-select__native"
        defaultValue={props.defaultValue}
        onChange={evt => props.onChange(evt.target.value)}
      >
        {props.items.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export { SelectField }