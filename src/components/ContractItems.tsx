import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import StatusBadge from "./StatusBadge";

type Props = {
  naziv: string;
  dobavljac: string;
  status: string;
  img: string | undefined;
};

const ContractItems = ({ naziv, dobavljac, status, img }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography pb={1} fontWeight={600}>
          {naziv}
        </Typography>
        <Typography pb={1}>Provider: {dobavljac}</Typography>
        <StatusBadge status={status} />
      </CardContent>
      <CardMedia component="img" sx={{ width: 100, paddingRight: 1 }} image={img} alt={naziv} />
    </Card>
  );
};

export default ContractItems;
