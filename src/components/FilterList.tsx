import {
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  Skeleton,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import FilterListItem from "./FilterListItem";

type Props = {
  handleToggleCheckbox: (value: string) => void;
  handleToggleFilterGroup: () => void;
  buyerFiltersToDisplay: string[];
  showCheckboxes: boolean;
  checkedFilter: string[];
  statusFiltersToDisplay: string[];
};

const FilterList = ({
  handleToggleCheckbox,
  handleToggleFilterGroup,
  buyerFiltersToDisplay,
  showCheckboxes,
  checkedFilter,
  statusFiltersToDisplay,
}: Props) => {
    
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <ListItemButton onClick={handleToggleFilterGroup}>
          <ListItemText primary={t("buyer")} />
          {showCheckboxes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showCheckboxes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {buyerFiltersToDisplay.map((buyer: string, index: number) => {
              return !buyer ? (
                <Skeleton variant="rectangular" width="100%" height={50} />
              ) : (
                <FilterListItem
                  key={index}
                  handleToggleCheckbox={handleToggleCheckbox}
                  labelId={buyer}
                  propertyToFilter={buyer}
                  isChecked={checkedFilter.indexOf(buyer) !== -1}
                />
              );
            })}
          </List>
        </Collapse>
      </Box>
      <Box mb={2}>
        <ListItemButton onClick={handleToggleFilterGroup}>
          <ListItemText primary="Status" />
          {showCheckboxes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showCheckboxes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {statusFiltersToDisplay.map((status: string, index: number) => {
              return (
                <FilterListItem
                  key={index}
                  handleToggleCheckbox={handleToggleCheckbox}
                  labelId={status}
                  propertyToFilter={status}
                  isChecked={checkedFilter.indexOf(status) !== -1}
                />
              );
            })}
          </List>
        </Collapse>
      </Box>
    </>
  );
};

export default FilterList;
