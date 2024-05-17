import {
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  handleToggleCheckbox: (propertyToFilter: string) => void;
  labelId: string;
  propertyToFilter: string;
  isChecked: boolean;
};

const FilterListItem = ({
  handleToggleCheckbox,
  labelId,
  propertyToFilter,
  isChecked,
}: Props) => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <ListItemButton
        key={propertyToFilter}
        onClick={() => handleToggleCheckbox(propertyToFilter)}
        dense
      >
        <Checkbox
          edge="start"
          checked={isChecked}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": labelId }}
        />
        <ListItemText id={labelId} primary={propertyToFilter} />
      </ListItemButton>
    </ListItem>
  );
};

export default FilterListItem;
