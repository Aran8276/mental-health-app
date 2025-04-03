import { UseFormReturn } from "react-hook-form";

export interface AddressFormData {
  country: string;
  provinceState?: string | undefined;
  city?: string | undefined;
  street: string;
  postalCode: string;
}

export interface AddressInfoChangeProps {
  form: UseFormReturn<AddressFormData>;
  loading: boolean;
  error: string | null;
  onSubmit: (data: AddressFormData) => void;
  countries: { value: string; label: string }[];
  provinces: { value: string; label: string }[];
  cities: { value: string; label: string }[];
  selectedCountry?: string;
  selectedProvince?: string;
  handleCountryChange: (countryCode: string) => void;
  handleProvinceChange: (provinceCodeOrName: string) => void;
}
