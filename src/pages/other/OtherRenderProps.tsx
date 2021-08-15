// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const OtherRenderProps = (props: Props) => {
  return (
    <>

      <Bar render={(val) => {
        return <div>{val} is so nice!</div>
      }} />
    </>
  );
}

type BarProps = {
  render: (value: any) => JSX.Element
}
const Bar = (props: BarProps) => props.render("Valera");

export { OtherRenderProps };