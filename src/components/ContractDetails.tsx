import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import Header from "./Header";
import { convertDate } from "../utils/convertDate";
import { Contract, Item, Items } from "../types/types";
import { useItemsStore } from "../store/itemsStore";
import { useContractsStore } from "../store/contractsStore";
import { fetchItems } from "../utils/fetchFromItemsApi";
import useFetch from "../hooks/useFetch";
import ContractItems from "./ContractItems";

const ContractDetails = () => {
  const { id } = useParams();
  const { contracts } = useContractsStore.getState();
  const { setItems } = useItemsStore();
  const { data: items, loading, error } = useFetch(fetchItems); // fetch items

  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [relatedItems, setRelatedItems] = useState<Item[]>([]);

  const getContractById = (id: number) => {
    const { contracts } = useContractsStore.getState();
    return contracts.find((contract: Contract) => contract.id === id);
  };

  // if url param id exists, get contract with that same id from state
  useEffect(() => {
    if (id) {
      const contractById = getContractById(parseInt(id));
      setContract(contractById);
    }
  }, [contracts, id]);

  // call set method from store and update items state array
  useEffect(() => {
    if (contract) {
      setItems(items as Items[]);
    }
  }, [setItems, contract, items]);

  useEffect(() => {
    if (contract) {
      const matchedItems =
        (items as Items[]).find(
          (item: Items) =>
            item.broj_ugovora === (contract as Contract).broj_ugovora
        )?.artikli || [];
      setRelatedItems(matchedItems);
    }
  }, [contract, items]);

  return (
    <Container maxWidth={false} disableGutters>
      <Header title={"Contract Details"} />
      {loading && <CircularProgress sx={{ margin: '1rem'}} />}
      {error && (
        <Typography variant="h3">
          No data found. Please try a different contract.
        </Typography>
      )}
      {contract && (
        <Card sx={{ maxWidth: "800px", marginLeft: "1rem", marginTop: "1rem" }}>
          <CardContent>
            <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
              {(contract as Contract).broj_ugovora}
            </Typography>
            <Typography
              fontWeight={600}
              paragraph
              sx={{ marginBottom: "0.5rem" }}
            >
              Kupac:
            </Typography>
            <Typography>{(contract as Contract).kupac}</Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Typography
              fontWeight={600}
              paragraph
              sx={{ marginBottom: "0.5rem" }}
            >
              Datum akontacije:{" "}
            </Typography>
            <Typography>
              {convertDate((contract as Contract).datum_akontacije)}
            </Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Typography
              fontWeight={600}
              paragraph
              sx={{ marginBottom: "0.5rem" }}
            >
              Rok isporuke:
            </Typography>
            <Typography>
              {convertDate((contract as Contract).rok_isporuke)}
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
              {(contract as Contract).status.toLowerCase()}
            </Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Typography variant="h6" sx={{ marginTop: "1rem" }}>
              Items:
            </Typography>
            <Grid container spacing={2} mt={1}>
              {relatedItems.map((item) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={item.id}>
                  <ContractItems
                    naziv={item.naziv}
                    dobavljac={item.dobavljac}
                    status={item.status}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ContractDetails;
