export const convertDate = (deliveryDate: string) => {
  const parts = deliveryDate.split("-"); // rearrange contract delivery date to european format
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
};
