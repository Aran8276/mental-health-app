import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";

import AddressInfoChangeView from "./AddressInfoChange.view";
import { AddressFormData } from "./AddressInfoChange.type";
import { addressSchema } from "./AddressInfoChange.data";

const AddressInfoChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [provinces, setProvinces] = useState<
    { value: string; label: string }[]
  >([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "",
      provinceState: "",
      city: "",
      street: "",
      postalCode: "",
    },
    mode: "onChange",
  });

  const selectedCountryCode = form.watch("country");
  const selectedProvinceCodeOrName = form.watch("provinceState");

  useEffect(() => {
    const countryData = Country.getAllCountries().map((country: ICountry) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountries(countryData);

    const initialCountryCode = form.getValues("country");
    const initialProvinceCodeOrName = form.getValues("provinceState");

    if (initialCountryCode) {
      handleCountryChange(initialCountryCode, false);
      if (initialProvinceCodeOrName) {
        setTimeout(() => {
          handleProvinceChange(initialProvinceCodeOrName, false);
        }, 0);
      }
    }
  }, [form]);

  const handleCountryChange = useCallback(
    (countryCode: string, resetFields = true) => {
      const stateData = State.getStatesOfCountry(countryCode).map(
        (state: IState) => ({
          value:
            state.isoCode && state.isoCode.trim() !== ""
              ? state.isoCode
              : state.name,
          label: state.name,
        })
      );
      setProvinces(stateData);
      setCities([]);

      if (resetFields) {
        form.resetField("provinceState", { defaultValue: "" });
        form.resetField("city", { defaultValue: "" });

        form.trigger("provinceState");
        form.trigger("city");
      }
    },
    [form]
  );

  const handleProvinceChange = useCallback(
    (provinceCodeOrName: string, resetCityField = true) => {
      const currentCountryCode = form.getValues("country");
      if (!currentCountryCode || !provinceCodeOrName) {
        setCities([]);
        if (resetCityField) form.resetField("city", { defaultValue: "" });
        return;
      }

      const selectedState = State.getStatesOfCountry(currentCountryCode).find(
        (s) => s.isoCode === provinceCodeOrName || s.name === provinceCodeOrName
      );

      let cityData: { value: string; label: string }[] = [];
      if (selectedState) {
        cityData = City.getCitiesOfState(
          currentCountryCode,
          selectedState.isoCode
        ).map((city: ICity) => ({
          value: city.name,
          label: city.name,
        }));
      }

      setCities(cityData);

      if (resetCityField) {
        form.resetField("city", { defaultValue: "" });
        form.trigger("city");
      }
    },
    [form]
  );

  const onSubmit = (data: AddressFormData) => {
    setLoading(true);
    setError(null);
    console.log("Address Data to Submit:", data);

    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <AddressInfoChangeView
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      countries={countries}
      provinces={provinces}
      cities={cities}
      selectedCountry={selectedCountryCode}
      selectedProvince={selectedProvinceCodeOrName}
      handleCountryChange={handleCountryChange}
      handleProvinceChange={handleProvinceChange}
    />
  );
};

export default AddressInfoChange;
