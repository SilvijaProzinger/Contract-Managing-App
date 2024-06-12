import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  Box,
  CardContent,
  Divider,
  Grid,
  CircularProgress,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { convertDate } from "../utils/convertDate";
import { Contract, Item } from "../types/types";
import Header from "./Header";
import ContractItems from "./ContractItems";

type Props = {
  contractDetails: Contract | undefined;
  loading: boolean;
  error: Error | null;
  relatedItems: Item[];
};

const ContractDetailsContent = ({
  contractDetails,
  loading,
  error,
  relatedItems,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Container maxWidth={false} disableGutters>
      <Header title={t("contractDetailsTitle")} />
      <Box mx="auto" mt={3} maxWidth={800}>
        <Link
          component={RouterLink}
          to={"/"}
          color="primary"
          underline="always"
          fontWeight={600}
          fontSize="1.25rem"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {" "}
          <ArrowBackIcon />
          {t("backLink")}
        </Link>
      </Box>
      {contractDetails && (
        <Card
          raised
          sx={{ maxWidth: "800px", padding: "1rem", margin: "2rem auto" }}
        >
          <CardContent>
            <Typography variant="h2" mb={3}>
              {(contractDetails as Contract).broj_ugovora}
            </Typography>
            <Typography
              fontWeight={600}
              paragraph
              sx={{ marginBottom: "0.5rem" }}
            >
              {t("buyer")}:
            </Typography>
            <Typography>{(contractDetails as Contract).kupac}</Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Typography
              fontWeight={600}
              paragraph
              sx={{ marginBottom: "0.5rem" }}
            >
              {t("depositionDate")}:{" "}
            </Typography>
            <Typography>
              {convertDate((contractDetails as Contract).datum_akontacije)}
            </Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Typography
              fontWeight={600}
              paragraph
              sx={{ marginBottom: "0.5rem" }}
            >
              {t("deliveryDate")}:
            </Typography>
            <Typography>
              {convertDate((contractDetails as Contract).rok_isporuke)}
            </Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Typography
              fontWeight={600}
              paragraph
              sx={{ marginBottom: "0.5rem" }}
            >
              Status:
            </Typography>
            <Typography>
              {(contractDetails as Contract).status.toLowerCase()}
            </Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Typography variant="h6" sx={{ marginTop: "1rem" }}>
              {t("items")}:
            </Typography>
            <Grid container spacing={2} mt={1}>
              {loading && <CircularProgress sx={{ margin: "1rem" }} />}
              {error ? (
                <Typography variant="h3">{t("detailsError")}</Typography>
              ) : (
                relatedItems.map((item) => (
                  <Grid item xs={12} sm={6} md={6} lg={6} key={item.id}>
                    <ContractItems
                      naziv={item.naziv}
                      dobavljac={item.dobavljac}
                      status={item.status}
                      img={item.img}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ContractDetailsContent;
