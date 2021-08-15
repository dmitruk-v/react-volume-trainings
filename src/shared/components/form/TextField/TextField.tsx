// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./TextField.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  defaultValue: string,
  onChange: (value: string) => void
};

const TextField = (props: Props) => {
  return (
    <input
      defaultValue={props.defaultValue}
      onChange={evt => props.onChange(evt.target.value)}
    />
  );
}

export { TextField }