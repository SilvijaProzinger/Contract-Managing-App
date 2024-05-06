import { Badge } from "@mui/material";

type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const getStatusColor = (status: string) => {
    if (status === "KREIRANO") {
      return "#4CAF50";
    } else if (status === "NARUČENO") {
      return "#FFC857";
    } else return "#cccbc8";
  };

  return (
    <Badge
      sx={{
        bgcolor: getStatusColor(status),
        p: 1,
        mt: 1,
        color: "white",
        borderRadius: "4px",
        alignSelf: "flex-start",
      }}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
