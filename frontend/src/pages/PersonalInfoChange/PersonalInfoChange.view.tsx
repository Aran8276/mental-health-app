import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Added for Bio
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Added for Gender
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadableButton from "@/components/LoadableButton/LoadableButton";

import {
  ArrowLeft,
  UserCog, // Changed icon for personal info
  Save,
  ShieldAlert,
  User, // Icon for Full Name
  Mail, // Icon for Email
  Phone, // Icon for Phone Number
  Info, // Icon for Bio
  Users, // Icon for Gender (using Users as placeholder)
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  pageVariants,
  cardFadeUp,
  formContainerStagger,
  formItemVariants,
  // Removed strengthColors, strengthText as they are password specific
  errorVariant,
  buttonHoverTap,
  // Assuming these variants are general enough or defined elsewhere appropriately
  // If not, create PersonalInfoChange.data.ts or adapt these
} from "./PersonalInfoChange.data"; // Adjusted import path assumption
import { PersonalInfoChangeProps } from "./PersonalInfoChange.type"; // Adjusted import path

const PersonalInfoChangeView: FC<PersonalInfoChangeProps> = ({
  loading,
  error,
  onSubmit,
  navigate,
  form,
}) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center px-4 py-12 min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950" // Adjusted gradient slightly
    >
      <div className="w-full max-w-lg mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)} // Assuming navigate(-1) goes back
          className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Pengaturan
        </Button>
      </div>

      <motion.div className="flex justify-center w-full" variants={cardFadeUp}>
        <Card className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30" // Adjusted color
            >
              <UserCog className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">
              Ubah Informasi Pribadi
            </CardTitle>
            <CardDescription>
              Perbarui informasi pribadi Anda di sini.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <Form {...form}>
              <motion.form
                variants={formContainerStagger}
                initial="hidden"
                animate="visible"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Nama Lengkap Field */}
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Masukkan nama lengkap Anda"
                              required
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500 h-11 pl-10" // Added pl-10 for icon
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Masukkan alamat email Anda"
                              required
                              {...field}
                              // Consider adding readOnly if email change is complex
                              // readOnly
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500 h-11 pl-10" // Added pl-10 for icon
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Nomor Handphone Field */}
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Handphone</FormLabel>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Contoh: 081234567890"
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500 h-11 pl-10" // Added pl-10 for icon
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Gender Field */}
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />{" "}
                          {/* Icon for Select */}
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:ring-indigo-400 dark:focus:ring-indigo-500 h-11 pl-10">
                                <SelectValue placeholder="Pilih jenis kelamin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Laki-laki">
                                Laki-laki
                              </SelectItem>
                              <SelectItem value="Perempuan">
                                Perempuan
                              </SelectItem>
                              <SelectItem value="Lainnya">Lainnya</SelectItem>
                              {/* Add more options if needed */}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Bio Singkat Field */}
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio Singkat</FormLabel>
                        <div className="relative">
                          {/* Optional: Add icon inside textarea if desired, more complex positioning */}
                          {/* <Info className="absolute left-3 top-3 h-4 w-4 text-gray-400" /> */}
                          <FormControl>
                            <Textarea
                              placeholder="Ceritakan sedikit tentang diri Anda... (opsional, maks 150 karakter)"
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500 min-h-[80px]" // Adjusted min-height
                              // rows={3} // Or set rows
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      variants={errorVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-md text-center font-medium flex items-center justify-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" /> {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div variants={formItemVariants} className="pt-2">
                  <motion.button
                    type="submit" // Add type="submit" here for better form handling
                    whileHover={!loading ? buttonHoverTap.hover : {}}
                    whileTap={!loading ? buttonHoverTap.tap : {}}
                    disabled={loading}
                    className="w-full" // Make the motion button take full width
                  >
                    <LoadableButton
                      isLoading={loading}
                      type="submit" // Keep type="submit" on LoadableButton as well
                      className={cn(
                        "w-full h-11 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-70" // Adjusted color
                      )}
                      disabled={loading} // Ensure LoadableButton also gets disabled state
                    >
                      <Save className="mr-2 h-5 w-5" /> Simpan Perubahan
                    </LoadableButton>
                  </motion.button>
                </motion.div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PersonalInfoChangeView;
