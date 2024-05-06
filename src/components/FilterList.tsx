import {
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Checkbox,
  Collapse,
  Box,
} from "@mui/material";
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
};

const FilterList = ({ screenWidth, open, toggleDrawer }: Props) => {
  const { contracts } = useContractsStore();
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [checkedFilter, setCheckedFilter] = useState<string[]>([]);

  // show only unique values for filtering in case one buyer shows up multiple times
  const buyerFiltersToDisplay = Array.from(
    new Set(contracts.map((contract: Contract) => contract.kupac))
  );

  // create 'active' or 'inactive' filter values for contract status 
  const statusFiltersToDisplay = contracts.map((contract: Contract) => {
    if (contract.status === 'KREIRANO' || contract.status === 'NARUČENO') return 'aktivan'
    else return ('neaktivan')
  })

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

  const handleToggleFilterGroup = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  useEffect(() => {
    console.log(checkedFilter, buyerFiltersToDisplay, statusFiltersToDisplay);
  }, [checkedFilter, buyerFiltersToDisplay, statusFiltersToDisplay]);

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      variant={screenWidth > 1200 ? "permanent" : "temporary"}
      anchor={"left"}
    >
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
      {/*<Box>
        <ListItemButton onClick={handleToggleFilterGroup}>
          <ListItemText primary="Aktivnost" />
          {showCheckboxes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showCheckboxes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {contracts.map((contract: Contract) => {
              const labelId = `${contract.status}`;
              return (
                <ListItemButton
                  key={contract.kupac}
                  role={undefined}
                  onClick={handleToggleCheckbox(contract.status)}
                  dense
                >
                  <Checkbox
                    edge="start"
                    checked={checkedFilter.indexOf(contract.status) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                  <ListItemText id={labelId} primary={contract.status} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
        </Box>*/}
    </Drawer>
  );
};

export default FilterList;
