import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Contract, Item, Items } from "../types/types";
import { useItemsStore } from "../store/itemsStore";
import useFetch from "../hooks/useFetch";
import { useContractsStore } from "../store/contractsStore";
import ContractDetailsContent from "./ContractDetailsContent";

const itemsUrl = process.env.REACT_APP_ITEMS_URL ?? "";

const ContractDetails = () => {
  const { id } = useParams();
  const { contracts } = useContractsStore();
  const { setItems } = useItemsStore();
  const { data: items, loading, error } = useFetch(itemsUrl); // fetch items

  const [contractDetails, setContractDetails] = useState<Contract | undefined>(
    undefined
  );
  const [relatedItems, setRelatedItems] = useState<Item[]>([]);

  const getContractById = useCallback(
    (id: number) => {
      return contracts?.find((contract) => contract.id === id);
    },
    [contracts]
  );

  // if url param id exists, get contract with that same id from state
  useEffect(() => {
    if (id) {
      const contractById = getContractById(parseInt(id));
      setContractDetails(contractById);
    }
  }, [getContractById, items, id]);

  // call set method from store and update items state array
  useEffect(() => {
    if (contractDetails && items) {
      setItems(items as Items[]);
    }
  }, [setItems, contractDetails, items]);

  useEffect(() => {
    if (items && contractDetails) {
      const matchedItems =
        (items as Items[]).find(
          (item: Items) =>
            item.broj_ugovora === (contractDetails as Contract).broj_ugovora
        )?.artikli || [];
      setRelatedItems(matchedItems);
    }
  }, [contractDetails, items]);

  return (
    <ContractDetailsContent
      loading={loading}
      error={error}
      contractDetails={contractDetails}
      relatedItems={relatedItems}
    />
  );
};

export default ContractDetails;
