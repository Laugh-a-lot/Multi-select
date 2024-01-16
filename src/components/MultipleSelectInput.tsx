import { useEffect, useRef, useState } from "react";

import classes from "./MultipleSelectInput.module.css";
import { Country } from "../types/Country";
import Chip from "./Chip";
import CountryItem from "./CountryItem";

type Props = {
  data: Country[];
  loading: boolean;
};

const MultipleSelectInput = ({ data }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Country[]>([]);
  const [suggestions, setSuggestions] = useState<Country[]>([...data]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [lastChipSelected, setLastChipSelected] = useState<boolean>(false);
  useEffect(() => {
    const handleBackspace = (event: KeyboardEvent) => {
      if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
        // Remove/highlight the last chip when backspace is pressed and the input is empty
        if (lastChipSelected) {
          const updatedChips = [...chips];
          updatedChips.pop();
          console.log("first");
          setChips(updatedChips);
          setLastChipSelected(false);
        } else {
          setLastChipSelected(true);
        }
      } else if (inputValue != "") {
        setSuggestions(
          data.filter(
            (suggestion) =>
              !chips.some((chip) => chip.name.common === suggestion.name.common)
          )
        );
      }
    };

    document.addEventListener("keydown", handleBackspace);
    return () => {
      document.removeEventListener("keydown", handleBackspace);
    };
  }, [inputValue, chips, lastChipSelected]);

  useEffect(() => {
    setSuggestions([...data]);
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter suggestions based on input value
    const filteredSuggestions = data.filter((suggestion) => {
      return (
        !chips.some((chip) => chip.name.common === suggestion.name.common) &&
        suggestion.name.common.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSuggestions(filteredSuggestions);
  };

  const handleChipClick = (suggestion: Country) => {
    const allChips = [...chips, suggestion];
    setChips(allChips);
    // Clear input value and suggestions
    setInputValue("");
    setSuggestions(() =>
      data.filter(
        (suggestion) =>
          !allChips.some((chip) => chip.name.common === suggestion.name.common)
      )
    );
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChipRemove = (name: string) => {
    const updatedChips = chips.filter((chip) => chip.name.common !== name);
    setChips(updatedChips);
  };
  return (
    <div className={classes.container}>
      <h4>Multiple Select Input</h4>
      <label className={classes.label} htmlFor="chip-input">
        <div className={classes.chips}>
          {chips.map((chip, index) => (
            <Chip
              key={chip.name.official}
              country={chip}
              handleChipRemove={handleChipRemove}
              selected={(index === chips.length - 1) && lastChipSelected}
            />
          ))}
          <input
            value={inputValue}
            className={classes.input}
            onChange={handleInputChange}
            placeholder="Type here..."
            id="chip-input"
            ref={inputRef}
          />
        </div>

        <CountryItem
          suggestions={suggestions}
          handleChipClick={handleChipClick}
        />
      </label>
    </div>
  );
};

export default MultipleSelectInput;
