import type { StylesConfig } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};

export const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base) => ({
    ...base,
    height: window.innerWidth >= 768 ? "48px" : "44px",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "10px 18px",
     borderRadius: "60px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#93939a",
    // marginTop: window.innerWidth <= 768 ? "0" : "4px",
    // marginBottom: "5px",
     transform: "translateY(-2px)",
  }),

  valueContainer: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    marginTop: window.innerWidth <= 768 ? "0" : "4px",
    // marginBottom: "2px",
    color: "#111",
      transform: "translateY(-2px)",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#111",
    padding: "auto",
  }),

  clearIndicator: (base) => ({
    ...base,
    paddingRight: 0,
    marginRight: 20,
    marginTop: 4,
    color: "#111",
  }),

      indicatorsContainer: (baseStyles) => ({
      ...baseStyles,
      transform: "translateY(-2px)",
    }),

  menu: (provided) => ({
    ...provided,
    marginTop: "8px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
  }),

  menuList: (provided) => ({
    ...provided,
    padding: "12px 0",
    maxHeight: "250px",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    color: state.isFocused || state.isSelected ? "#59b17a" : "#333",
    padding: "8px 20px",
    cursor: "pointer",
  }),
};

export const asyncStyles: StylesConfig<SelectOption, false> = {
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isFocused ? "#D3D3D3" : "#111",
    marginTop: window.innerWidth <= 768 ? "0" : "4px",
    marginBottom: "2px",
  }),
};
