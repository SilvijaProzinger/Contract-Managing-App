export type Contract = {
  id: number;
  kupac: string;
  broj_ugovora: string;
  datum_akontacije: string;
  rok_isporuke: string;
  status: string;
  items?: Items;
};

export type ContractsState = {
  contracts: Contract[];
  setContracts: (newContracts: Contract[]) => void;
  addContract: (newContract: Contract) => void;
  updateContract: (updatedContract: Contract) => void;
  getContractById?: (id: number) => Contract | undefined;
};

export type Item = {
  id: number;
  naziv: string;
  dobavljac: string;
  status: string;
};

export type Items = {
  broj_ugovora: string;
  artikli: Item[];
};

export type ItemState = {
  items: Items[];
  setItems: (newItems: Items[]) => void;
};
