import { PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const Address = () => {
    return (
        <section className="border w-full h-auto rounded-4xl p-7 flex flex-col gap-12 relative">
            <h1 className="font-bold text-2xl">Alamat</h1>
            <div className="grid grid-cols-2 grid-rows-2 gap-8 w-[70rem]">
                <div className="w-80 flex flex-col gap-3">
                    <h1 className="text-gray-400 font-[500]">Negara</h1>
                    <p className="font-bold text-[21px]">Indonesia</p>
                </div>
                <div className="w-80 flex flex-col gap-3 row-start-2">
                    <h1 className="text-gray-400 font-[500]">Jalan</h1>
                    <p className="font-bold text-[21px]">Jalan Sudirman</p>
                </div>
                <div className="w-80 flex flex-col gap-3 row-start-2">
                    <h1 className="text-gray-400 font-[500]">Kode Pos</h1>
                    <p className="font-bold text-[21px]">55588</p>
                </div>
                <div className="w-80 flex flex-col gap-3">
                    <h1 className="text-gray-400 font-[500]">Kota/Provinsi</h1>
                    <p className="font-bold text-[21px]">Yogyakarta, DIY</p>
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

export default Address;