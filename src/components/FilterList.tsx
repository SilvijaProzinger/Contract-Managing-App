import {
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterListItem from "./FilterListItem";
import { useContractsStore } from "../store/contractsStore";
import { useEffect, useState } from "react";
import { Contract } from "../types/types";

type Props = {
  screenWidth: number;
  open: boolean;
  toggleDrawer: () => void;
  filterContracts: (appliedFilters: string[]) => void;
};

const DrawerCustom = styled(Drawer)({
  width: "300px",
  "& .MuiDrawer-paper": {
    width: "300px",
    marginTop: "70px",
    paddingTop: "32px",
  },
});

const FilterList = ({ screenWidth, open, toggleDrawer, filterContracts }: Props) => {
  const { contracts } = useContractsStore();
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [checkedFilter, setCheckedFilter] = useState<string[]>([]);

  // show only unique values for filtering in case one buyer shows up multiple times
  const buyerFiltersToDisplay = Array.from(
    new Set<string>(contracts.map((contract: Contract) => contract.kupac))
  );

  // create 'active' or 'inactive' filter values for contract status
  const statusFiltersToDisplay = Array.from(
    new Set<string>(
      contracts.map((contract: Contract) => {
        if (contract.status === "KREIRANO" || contract.status === "NARUČENO")
          return "aktivan";
        else return "neaktivan";
      })
    )
  );

  // toggle filter checkboxes and add them to filter state
  const handleToggleCheckbox = (value: string) => () => {
    const currentIndex = checkedFilter.indexOf(value);
    const newChecked = [...checkedFilter];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedFilter(newChecked);
  };

  // toggle filter group dropdown
  const handleToggleFilterGroup = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  useEffect(() => {
    filterContracts(checkedFilter)
  }, [filterContracts, checkedFilter]);

  return (
    <DrawerCustom
      open={open}
      onClose={toggleDrawer}
      variant={screenWidth > 1200 ? "permanent" : "temporary"}
      anchor={"left"}
    >
      <Typography variant="h6" pl={2} pb={2}>
        Filter contracts
      </Typography>
      <Box>
        <ListItemButton onClick={handleToggleFilterGroup}>
          <ListItemText primary="Kupac" />
          {showCheckboxes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showCheckboxes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {buyerFiltersToDisplay.map((buyer: string) => {
              return (
                <FilterListItem
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
      <Box>
        <ListItemButton onClick={handleToggleFilterGroup}>
          <ListItemText primary="Status" />
          {showCheckboxes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showCheckboxes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {statusFiltersToDisplay.map((status: string) => {
              return (
                <FilterListItem
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
    </DrawerCustom>
  );
};

export default FilterList;
