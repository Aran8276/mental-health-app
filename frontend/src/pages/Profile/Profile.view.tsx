import { PenLine, EllipsisVertical } from "lucide-react";
import Address from "@/components/AddressCard/address.view";
import PersonalInfo from "@/components/PersonalInformationCard/PersonalInfoCard.view";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileView = () => {
  return (
    <section className="flex flex-col px-8 gap-10">
      <div className="h-90 flex-col items-center relative overflow-hidden">
        <div className="bg-gray-200 w-full h-60 rounded-4xl relative overflow-hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="absolute bg-white rounded-full p-2 right-5 top-5">
                <EllipsisVertical className="w-7 h-7" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-[-10px] top-4">
              <DropdownMenuItem>Hapus Banner</DropdownMenuItem>
              <DropdownMenuItem>Ubah Banner</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <img src="public/banner.webp" className="w-full" />
        </div>
        <div className="w-50 h-50 absolute bottom-0 left-10">
          <img
            src="public/pict.jpg"
            className="rounded-full w-50 h-50 border-9 border-white"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-white rounded-full p-4 border-1 absolute right-0 bottom-0">
                <PenLine className="w-5.5 h-5.5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-[-11rem] top-[-5rem]">
                <DropdownMenuItem>Hapus Profil</DropdownMenuItem>
                <DropdownMenuItem>Ubah Profil</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-[2rem]">Profilku</h1>
      </div>
      <section className="flex flex-col gap-10">
        <PersonalInfo />
        <Address />
      </section>
    </section>
  );
};

export default ProfileView;
