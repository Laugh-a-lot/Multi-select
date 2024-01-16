import { Country } from "../types/Country";
import classes from "./MultipleSelectInput.module.css";
type Props = {
  suggestions: Country[];
  handleChipClick: (country: Country) => void;
};

const CountryItem = ({ suggestions, handleChipClick }: Props) => {
  return (
    <>
      {suggestions.length > 0 && (
        <ul className={classes.suggestions}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.name.official}
              onClick={() => handleChipClick(suggestion)}
              className={classes.countryItem}
            >
              <img src={suggestion.flags.png} alt={suggestion.name.common} className={classes.flag}/>
              {suggestion.name.common}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CountryItem;
