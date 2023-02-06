import React, { useState } from "react";
import PropTypes from "prop-types";
import pen from "../../assets/icons/pen.svg";
import trash from "../../assets/icons/trash.svg";
import logo from "../../assets/images/logo.png";
import plus from "../../assets/icons/plus-blue.svg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  handleKirim,
  setDataPayload,
  setDataPayloadEdit,
  setDataRiwayat,
  setDataSertifikasi,
  setSuccessConfirmation,
} from "../../stores/action/dataPegawai";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import DeleteSuccess from "../../components/DeleteSuccess";
import { Button } from "antd";
import SendConfirmation from "../../components/SendConfirmation";
import SuccessConfirmation from "../../components/SuccessConfirmation";
const ListDataPegawait = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { dataPayload, isSuccess } = useSelector((state) => state.dataPegawai);

  const [itemDelete, setItemDelete] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [sendConfirmtaion, setSendConfirmation] = useState(false);

  return (
    <div>
      <DeleteConfirmation
        isModalOpen={deleteConfirmation}
        handleCancel={() => {
          setItemDelete(null);
          setDeleteConfirmation(false);
        }}
        handleOk={() => {
          if (dataPayload.length === 1) {
            dispatch(setDataPayload([]));
          }
          const data = dataPayload.filter(
            (item) => item.NamaLengkap !== itemDelete?.NamaLengkap
          );

          dispatch(setDataPayload(data));
          dispatch(setSuccessConfirmation(true));
          setDeleteConfirmation(false);
        }}
      />{" "}
      <DeleteSuccess
        isModalOpen={isSuccess}
        handleCancel={() => {
          dispatch(setSuccessConfirmation(false));
        }}
      />
      <SendConfirmation
        isModalOpen={sendConfirmtaion}
        handleCancel={() => setSendConfirmation(false)}
        handleOk={() => {
          dispatch(
            handleKirim(dataPayload, JSON.parse(localStorage.getItem("token")))
          );
          setSendConfirmation(false);
        }}
      />
      <SuccessConfirmation
        isModalOpen={isSuccess}
        handleCancel={() => dispatch(setSuccessConfirmation(false))}
        handleOk={() => dispatch(setSuccessConfirmation(false))}
        message="Data Berhasil Dikirim"
      />
      <nav className="w-full flex items-center justify-between px-2 py-2 bg-[#F9FFF903]">
        <Image src={logo} className="w-[146px] lg:w-[186px]" alt="logo" />
        <span className="font-nunito text-[#414141]">Data Pegawai</span>
        <Link href={"/login"}>
          <button
            onClick={() => localStorage.clear()}
            className="w-24 bg-[#FFFFFF] h-9 rounded-md border-2 border-[#128ECC] outline-none text-[#128ECC]"
          >
            Keluar
          </button>
        </Link>{" "}
      </nav>
      <main className="max-w-[610px] mx-auto flex flex-col px-2 pt-[120px]">
        {dataPayload.map((item, index) => (
          <div
            key={index}
            className="flex w-full justify-between items-center h-[72px] border-b-[1px]"
          >
            <span className="text-[#414141B2]">{item?.NamaLengkap}</span>
            <div
              // onClick={() => {
              //   setIsOpen({ ...isOpen, info: !isOpen.info });
              // }}
              className="w-[120px] flex justify-end h-[30px] cursor-pointer"
            >
              <div className="flex justify-between w-[60px]">
                {" "}
                <Image
                  onClick={() => {
                    setItemDelete(item);
                    setDeleteConfirmation(true);
                  }}
                  src={trash}
                />
                <Image
                  onClick={() => {
                    router.push("/datapegawai");
                    dispatch(setDataRiwayat(item?.RiwayatPendidikan));
                    dispatch(setDataSertifikasi(item?.Sertifikasi));
                    dispatch(setDataPayloadEdit(item));
                  }}
                  src={pen}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex mt-4 space-x-4 items-center">
          <button className="w-[38px] h-[38px] border-[1px] border-[#E0E0E0] flex justify-center items-center rounded bg-[#FFFFFF]">
            <Image
              onClick={() => {
                router.push("/datapegawai");
                dispatch(setDataPayloadEdit({}));
                dispatch(setDataSertifikasi([]));
                dispatch(setDataRiwayat([]));
              }}
              src={plus}
              alt="img"
            />
          </button>
          <span className="font-nunito text-[#128ECC]">Tambah Pegawai</span>
        </div>
        <Button
          style={{
            backgroundColor: "#128ECC",
            border: "none",
            borderRadius: 4,
            width: "100%",
            height: 38,
            color: "#FFFFFF",
            marginTop: 25,
          }}
          onClick={() => setSendConfirmation(true)}
          // disabled={
          //   dataRiwayat.length < 1 ||
          //   dataSertifikasi.length < 1 ||
          //   Object.values(formData).every((item) => item === "")
          // }
        >
          Kirim
        </Button>
      </main>
    </div>
  );
};

ListDataPegawait.propTypes = {};

export default ListDataPegawait;
