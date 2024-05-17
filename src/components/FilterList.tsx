import {
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import FilterListItem from "./FilterListItem";
import { useContractsStore } from "../store/contractsStore";
import { useEffect, useState } from "react";
import { Contract } from "../types/types";

type Props = {
  isDesktop: boolean;
  open: boolean;
  toggleDrawer: () => void;
  filterContracts: (appliedFilters: string[]) => void;
};

const DrawerCustom = styled(Drawer)({
  width: "300px",
  position: "absolute",
  height: "100%",
  bottom: "0",
  top: "0",
  "& .MuiDrawer-paper": {
    position: "absolute",
    width: "300px",
    paddingTop: "2rem",
    height: "100%",
    zIndex: 4,
  },
});

const FilterList = ({
  isDesktop,
  open,
  toggleDrawer,
  filterContracts,
}: Props) => {
  const { contracts } = useContractsStore();
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [checkedFilter, setCheckedFilter] = useState<string[]>([]);

  const { t } = useTranslation();

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
  const handleToggleCheckbox = (value: string) => {
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
    filterContracts(checkedFilter);
  }, [filterContracts, checkedFilter]);

  return (
    <DrawerCustom
      elevation={3}
      open={open}
      onClose={toggleDrawer}
      variant={isDesktop ? "permanent" : "temporary"}
      anchor={"left"}
    >
      {isDesktop && (
        <Box
          mb={3}
          mx="auto"
          sx={{
            width: 220,
            height: 200,
          }}
        >
          <img
            src="/undraw_agreement_re_d4dv.svg"
            alt=""
            width={220}
            height={200}
          />
        </Box>
      )}
      <Typography variant="h6" pl={2} pb={3}>
        {t('filterTitle')}
      </Typography>
      <Box mb={2}>
        <ListItemButton onClick={handleToggleFilterGroup}>
          <ListItemText primary={t('buyer')} />
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
      <Box>
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
    </DrawerCustom>
  );
};

export default FilterList;
