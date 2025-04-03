import { State, City } from "country-state-city";
import { z } from "zod";

const pageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "circOut" } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: "circIn" } },
};
const cardFadeUp = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 },
  },
};
const formContainerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const buttonHoverTap = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const errorVariant = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -5, height: 0, transition: { duration: 0.2 } },
};

const strengthColors = [
  "bg-red-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-emerald-500",
];

const strengthText = [
  "Sangat Lemah",
  "Sangat Lemah",
  "Lemah",
  "Cukup",
  "Kuat",
  "Sangat Kuat",
];

const addressSchema = z
  .object({
    country: z.string().min(1, "Negara wajib dipilih"),
    provinceState: z.string().optional(),
    city: z.string().optional(),
    street: z.string().min(3, "Alamat jalan minimal 3 karakter"),
    postalCode: z.string().min(3, "Kode pos minimal 3 karakter"),
  })
  .refine(
    (data) => {
      const states = State.getStatesOfCountry(data.country);
      return !(states.length > 0 && !data.provinceState);
    },
    {
      message: "Provinsi/Wilayah wajib dipilih jika tersedia",
      path: ["provinceState"],
    }
  )
  .refine(
    (data) => {
      if (!data.provinceState) return true;

      const selectedState = State.getStatesOfCountry(data.country).find(
        (s) => s.isoCode === data.provinceState || s.name === data.provinceState
      );
      if (!selectedState) return true;

      const cities = City.getCitiesOfState(data.country, selectedState.isoCode);
      return !(cities.length > 0 && !data.city);
    },
    {
      message: "Kota wajib dipilih jika tersedia",
      path: ["city"],
    }
  );

export {
  pageVariants,
  cardFadeUp,
  formContainerStagger,
  formItemVariants,
  buttonHoverTap,
  errorVariant,
  strengthColors,
  strengthText,
  addressSchema,
};
