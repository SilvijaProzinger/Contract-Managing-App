import { ListItemText, ListItemButton, Checkbox } from "@mui/material";

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
  return (
    <ListItemButton
      key={propertyToFilter}
      role={undefined}
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
  );
};

export default FilterListItem;
