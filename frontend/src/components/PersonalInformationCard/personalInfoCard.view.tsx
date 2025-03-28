import { PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const PersonalInfo = () => {
    return (
        <section className="border w-full h-auto rounded-4xl p-7 flex flex-col gap-12 relative">
            <h1 className="font-bold text-2xl">Informasi Pribadi</h1>
            <div className="grid grid-cols-2 grid-rows-3 gap-8 w-[70rem]">
                <div className="w-80 flex flex-col gap-3">
                    <h1 className="text-gray-400 font-[500]">Nama Depan</h1>
                    <p className="font-bold text-[21px]">Your</p>
                </div>
                <div className="w-80 flex flex-col gap-3 row-start-2">
                    <h1 className="text-gray-400 font-[500]">Email</h1>
                    <p className="font-bold text-[21px]">toyota@corola.com</p>
                </div>
                <div className="w-80 flex flex-col gap-3 row-start-3">
                    <h1 className="text-gray-400 font-[500]">Bio</h1>
                    <p className="font-bold text-[21px]">Need a hug</p>
                </div>
                <div className="w-80 flex flex-col gap-3">
                    <h1 className="text-gray-400 font-[500]">Nama Belakang</h1>
                    <p className="font-bold text-[21px]">Name</p>
                </div>
                <div className="w-80 flex flex-col gap-3 row-start-2">
                    <h1 className="text-gray-400 font-[500]">Nomor Handphone</h1>
                    <p className="font-bold text-[21px]">+62 812 345 6789</p>
                </div>
                <div className="w-80 flex flex-col gap-3 row-start-3">
                    <h1 className="text-gray-400 font-[500]">Gender</h1>
                    <p className="font-bold text-[21px]">Laki-laki</p>
                </div>
            </div>
            <Link to="" className="absolute right-10 top-10">
                <div className="flex items-center gap-3 border w-22 p-2 rounded-full">
                    <PenLine className="w-6 h-6"/>
                    <p>Edit</p>
                </div>
            </Link>
        </section>
    )
}

export default PersonalInfo;