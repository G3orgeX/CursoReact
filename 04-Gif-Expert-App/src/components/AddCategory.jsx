import React, { useState } from "react";

export const AddCategory = ({ onNewCategories }) => {
  const [inputValue, setInputValue] = useState("One Punch");

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim().length <= 1) return;
    //  setCategories(categories =>[inputValue,...categories])
    setInputValue("");
    onNewCategories(inputValue.trim());
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Buscar Gifs..."
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};
