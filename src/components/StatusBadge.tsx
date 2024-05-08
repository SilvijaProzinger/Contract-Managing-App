import { Badge, Icon } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const getStatusColor = (status: string) => {
    if (status === "KREIRANO") return "#4CAF50";
    else if (status === "NARUČENO") return "#FFC857";
    else return "#cccbc8";
  };

  const getStatusIcon = (status: string) => {
    if (status === "KREIRANO") return <EditNoteIcon />;
    else if (status === "NARUČENO") return <ShoppingCartIcon />;
    else if (status === "ISPORUČENO") return <LocalShippingIcon />;
    else return null;
  };

  return (
    <Badge
      sx={{
        color: getStatusColor(status),
        p: 1,
        borderRadius: "4px",
        alignSelf: "flex-start",
      }}
    >
      <Icon>{getStatusIcon(status)}</Icon>
      {status}
    </Badge>
  );
};

export default StatusBadge;
