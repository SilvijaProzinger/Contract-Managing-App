import { Badge, Icon } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PostAddIcon from '@mui/icons-material/PostAdd';

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
    else if (status === "NARUČENO") return <PostAddIcon />;
    else if (status === "ISPORUČENO") return <LocalPostOfficeIcon />;
    else return null;
  };

  return (
    <Badge
      sx={{
        color: getStatusColor(status),
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
