import Image from "next/image";
import logo from "../assets/images/logo.png";
import landing from "../assets/images/landingpage.png";
import phone from "../assets/icons/phone.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setAuthToken } from "../config/api";
export default function Home() {
  const [dataLogin, setDataLogin] = useState("");
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("dataLogin"));
    if (items) {
      setDataLogin(items?.Username);
    }
  }, []);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("token"));
    if (items) {
      setAuthToken(items);
    }
  }, []);
  return (
    <div>
      <nav className="w-full flex justify-between px-2 py-2 bg-[#F9FFF903]">
        <Image src={logo} alt="logo" />
        <Link href={`${dataLogin.length > 0 ? "/datapegawai" : "/login"} `}>
          <button className="w-24 bg-[#FFFFFF] h-9 rounded-md border-2 border-[#128ECC] outline-none text-[#128ECC]">
            {dataLogin.length > 0 ? `${dataLogin}` : "Masuk"}
          </button>
        </Link>{" "}
      </nav>
      <main className="h-screen bg-[#F9FFF903] flex flex-col justify-around pt-40 px-4 md:flex-row ">
        <div className="flex flex-col lg:ml-[200px] mt-[100px]">
          <h1 className="font-[700] font-nunito text-5xl text-[#414141] tracking-tight">
            Temukan Masa Depan
          </h1>
          <h1 className="font-nunito font-[700] text-5xl text-[#414141] tracking-wide mt-2">
            Karirmu Sekarang
          </h1>
          <p className="w-[528px] text-[20px] font-light leading-[126%] tracking-[0.02em] font-roboto text-[#414141] mt-6">
            Kami membantu menghubungkan para job seeker dengan
            perusahaan-perusahaan terbaik di Indonesia
          </p>

          <div className="flex justify-between w-[345px] mt-4 md:mt-10">
            <button className="bg-[#128ECC] w-[154px] h-[34px] border-[#128ECC] outline-none text-[#FFFFFF]  rounded-md font-nunito font-thin ">
              Selengkapnya
            </button>
            <button className="flex items-center w-[154px] h-[34px] px-2 justify-between bg-[#FFFFFF]  rounded-md border-[1px] border-[#128ECC] outline-none text-[#128ECC]">
              {" "}
              <Image alt="image" src={phone} />
              Hubungi Kami
            </button>
          </div>
        </div>

        <div className="lg:mr-[200px]">
          <Image className="w-[524px]" alt="image" src={landing} />
        </div>
      </main>
    </div>
  );
}
