import { FC } from "react";
import { AddressCardProps } from "./AddressCard.type";
import AddressCardView from "./AddressCard.view";

const AddressCard: FC<AddressCardProps> = ({ addressData }) => {
  return <AddressCardView addressData={addressData} />;
};

export default AddressCard;
