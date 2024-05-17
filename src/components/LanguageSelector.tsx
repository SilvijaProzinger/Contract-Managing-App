import { useTranslation } from "react-i18next";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 100, marginRight: '25px' }} size="small">
      <InputLabel id="language-selector-label" sx={{ display: "none" }}>
        Language
      </InputLabel>
      <Select
        labelId="language-selector-label"
        id="language-selector"
        value={i18n.language}
        onChange={handleLanguageChange}
        sx={{ background: "#fff" }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hr">Hrvatski</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
