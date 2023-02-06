import { useState } from "react";
import Image from "next/image";

// Library
import { Button, Input, Modal } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

// assets
import img from "../../assets/images/login.png";
import logo from "../../assets/images/logo.png";
import Link from "next/link";
import SuccessConfirmation from "../../components/SuccessConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  handleRegis,
  setSuccessConfirmation,
} from "../../stores/action/daftar";

const Daftar = () => {
  const { isSuccess, isLoading } = useSelector((state) => state.daftar);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    userName: "",
  });

  return (
    <div className=" flex w-screen  overflow-visible">
      <SuccessConfirmation
        message="Login Berhasil"
        isModalOpen={isSuccess}
        handleOk={() => {
          dispatch(setSuccessConfirmation(false));
          router.push("/login");
        }}
        handleCancel={() => {
          dispatch(setSuccessConfirmation(false));
          router.push("/login");
        }}
      />
      <div className=" hidden lg:flex flex-col w-[auto] ">
        <Image className="w-[1400px] h-[1000px]" src={img} alt="logo" />
        <Image
          className="w-[280] mt-[-150px] ml-[280px]"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <div className="w-full flex justify-center">
          <span className="font-nunito font-[600]">Halo!</span>
        </div>
        <div className="w-full   flex justify-center">
          <span className="font-nunito text-[#41414199] font-[400]">
            Silahkan masukkan data di bawah ini
          </span>
        </div>

        <Input
          style={{ width: 452, height: 44, borderRadius: 4 }}
          placeholder="Username"
          value={formData.userName}
          onChange={(e) => {
            setFormData({ ...formData, userName: e.target.value });
          }}
        />
        <Input
          style={{ width: 452, height: 44, borderRadius: 4 }}
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <Input.Password
          style={{ width: 452, height: 44, borderRadius: 4 }}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="input password"
        />
        <Button
          disabled={isLoading}
          onClick={() => dispatch(handleRegis(formData))}
          style={{
            marginTop: 40,
            backgroundColor: "#128ECC",
            border: "none",
            borderRadius: 4,
            width: 452,
            height: 44,
            color: "#FFFFFF",
          }}
        >
          Daftar
        </Button>
        <div>
          <span className="font-nunito text-[#4C4C4CE5] font-[400]">
            Sudah punya akun?{" "}
          </span>
          <Link href={"/login"}>
            <span className="font-nunito text-[#128ECC] font-[400]">
              Masuk Sekarang
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
