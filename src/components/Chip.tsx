import { Country } from "../types/Country";
import classes from "./Chip.module.css";
import classes2 from "./MultipleSelectInput.module.css";
type Props = {
  country: Country;
  handleChipRemove: (name: string) => void;
  selected: boolean;
};

const Chip = ({ country, handleChipRemove, selected }: Props) => {
  return (
    <div className={`${classes.chip} ${selected ? classes.selected :""}`}>
      <img src={country.flags.png} alt="" className={classes2.flag} />
      {country.name.common}
      <button
        className={classes.btn}
        onClick={() => handleChipRemove(country.name.common)}
      >
        X
      </button>
    </div>
  );
};

export default Chip;
