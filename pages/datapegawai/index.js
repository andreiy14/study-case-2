import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// library
import { Button, DatePicker, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

// assets
import logo from "../../assets/images/logo.png";
import plus from "../../assets/icons/plus.svg";
import minus from "../../assets/icons/minus.svg";
import pen from "../../assets/icons/pen.svg";

import FormRiwayat from "../../components/FormRiwayat";
import FormSertifikasi from "../../components/FormSerfikasi";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import DeleteSuccess from "../../components/DeleteSuccess";
import SuccessConfirmation from "../../components/SuccessConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetKota,
  handleGetProvinsi,
  setDataPayload,
  setDataRiwayat,
  setDataSertifikasi,
  setDataTempEditRiwayat,
  setDataTempEditSertifikasi,
} from "../../stores/action/dataPegawai";
const datapegawai = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    dataProvinsi,
    dataKota,
    dataRiwayat,
    dataSertifikasi,
    dataRiwayatEdit,
    dataSertifikasiEdit,
    dataPayload,
    dataPayloadEdit,
  } = useSelector((state) => state.dataPegawai);
  const dateNow = moment();
  const dates = dateNow.format("YYYY-MM-DD");
  const dateFormat = "YYYY-MM-DD";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [payload, setPayload] = useState([]);
  const [dataSer, setDataSer] = useState([]);
  const [isModalOpenSertifikasi, setIsModalOpenSertifikasi] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [successConfirmation, setSuccessConfirmation] = useState(false);

  const [isOpen, setIsOpen] = useState({
    info: false,
    riwayat: false,
    serfikasi: false,
  });
  const [formData, setFormData] = useState({
    NamaLengkap: "",
    TanggalLahir: moment(new Date(dates)).format("YYYY-MM-DD"),
    Umur: "",
    AlamatLengkap: "",
    Kd_Provinsi: "",
    Kd_Kota: "",
  });
  const onChange = (date, dateString) => {
    setFormData({ ...formData, TanggalLahir: dateString });
  };
  useEffect(() => {
    const dataFilter = dataRiwayat.filter(
      (item) => item.NamaSekolah !== dataRiwayatEdit.NamaSekolah
    );

    setData(dataFilter);
  }, [dataRiwayat, dataRiwayatEdit]);
  useEffect(() => {
    const dataFilter = dataSertifikasi.filter(
      (item) => item?.NamaLembaga !== dataSertifikasiEdit?.NamaLembaga
    );

    setDataSer(dataFilter);
  }, [dataSertifikasi, dataSertifikasiEdit]);
  useEffect(() => {
    dispatch(handleGetProvinsi());
  }, []);

  useEffect(() => {
    dispatch(handleGetKota(formData.Kd_Provinsi));
  }, [formData.Kd_Provinsi]);

  useEffect(() => {
    if (Object.values(dataPayloadEdit).length > 0) {
      const dataFilter = dataPayload.filter(
        (item) => item.NamaLengkap !== dataPayloadEdit.NamaLengkap
      );
      setPayload(dataFilter);
      setFormData({
        NamaLengkap: dataPayloadEdit?.NamaLengkap,
        TanggalLahir: dataPayloadEdit?.TanggalLahir,
        Umur: dataPayloadEdit?.Umur,
        AlamatLengkap: dataPayloadEdit?.AlamatLengkap,
        Kd_Provinsi: dataPayloadEdit?.Kd_Provinsi,
        Kd_Kota: dataPayloadEdit?.Kd_Kota,
      });
    }
  }, [dataPayloadEdit, dataPayload]);

  return (
    <div>
      <FormRiwayat
        footer={[]}
        isModalOpen={isModalOpen}
        handleCancel={() => {
          setIsModalOpen(false);
          dispatch(setDataTempEditRiwayat({}));
        }}
        handleOk={() => {
          setSuccessConfirmation(true);
          setIsModalOpen(false);
        }}
        handleDelete={() => setDeleteConfirmation(true)}
      />
      <FormSertifikasi
        footer={[]}
        isModalOpen={isModalOpenSertifikasi}
        handleCancel={() => {
          setIsModalOpenSertifikasi(false);
          dispatch(setDataTempEditRiwayat({}));
        }}
        handleDelete={() => setDeleteConfirmation(true)}
        handleOk={() => setSuccessConfirmation(true)}
      />
      <DeleteConfirmation
        isModalOpen={deleteConfirmation}
        handleCancel={() => setDeleteConfirmation(false)}
        handleOk={() => {
          setDeleteConfirmation(false);
          setIsModalOpenSertifikasi(false);
          setIsModalOpen(false);
          setDeleteSuccess(true);
          if (Object.values(dataRiwayatEdit).length > 0) {
            dispatch(setDataRiwayat([...data]));
            dispatch(setDataTempEditRiwayat({}));
          }
          if (Object.values(dataSertifikasiEdit).length > 0) {
            dispatch(setDataSertifikasi([...dataSer]));
            dispatch(setDataTempEditSertifikasi({}));
          }
        }}
      />
      <DeleteSuccess
        isModalOpen={deleteSuccess}
        handleCancel={() => {
          setDeleteSuccess(false);
          setDeleteConfirmation(false);
        }}
        handleOk={() => {
          setDeleteSuccess(false);
          setDeleteConfirmation(false);
        }}
      />
      <SuccessConfirmation
        isModalOpen={successConfirmation}
        handleCancel={() => {
          setSuccessConfirmation(false);
          setIsModalOpen(false);
          setIsModalOpenSertifikasi(false);
        }}
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
      <main className="max-w-[610px] mx-auto flex flex-col px-2 pt-[120px] ">
        <div className="flex w-full justify-between items-center h-[72px] border-b-[1px]">
          <span
            className={` ${
              isOpen?.info ? "text-[#128ECC]" : "text-[#414141B2]"
            }`}
          >
            Informasi Pribadi
          </span>
          <div
            onClick={() => {
              setIsOpen({ ...isOpen, info: !isOpen.info });
            }}
            className="w-[120px] flex justify-end h-[30px] cursor-pointer"
          >
            <Image src={isOpen.info ? minus : plus} />
          </div>
        </div>
        {isOpen.info ? (
          <div className="flex flex-col mt-[20px] space-y-4">
            <div className="space-y-2">
              <span className="font-roboto text-[#414141CC]">Nama Lengkap</span>{" "}
              <br />
              <Input
                style={{ height: 38 }}
                color="#414141"
                placeholder="Enter name..."
                value={formData.NamaLengkap}
                onChange={(e) => {
                  setFormData({ ...formData, NamaLengkap: e?.target?.value });
                }}
              />
            </div>
            <div className="space-y-2 w-full">
              <span className="font-roboto text-[#414141CC]">
                Tanggal Lahir
              </span>{" "}
              <br />
              <DatePicker
                style={{ width: "100%", height: 38 }}
                onChange={onChange}
                color="#414141"
                placeholder="Enter tanggal lahir..."
                value={dayjs(formData.TanggalLahir, dateFormat)}
                format={dateFormat}
              />
            </div>
            <div className="space-y-2">
              <span className="font-roboto text-[#414141CC]">Umur</span> <br />
              <Input
                style={{ height: 38 }}
                onChange={(e) =>
                  setFormData({ ...formData, Umur: e.target.value })
                }
                value={formData.Umur}
                color="#414141"
                placeholder="Enter umur..."
              />
            </div>
            <div className="space-y-2">
              <span className="font-roboto text-[#414141CC]">
                Alamat Lengkap
              </span>{" "}
              <br />
              <Input
                style={{ height: 38 }}
                onChange={(e) =>
                  setFormData({ ...formData, AlamatLengkap: e.target.value })
                }
                value={formData.AlamatLengkap}
                color="#414141"
                placeholder="Enter alamat lengkap..."
              />
            </div>
            <div className="space-y-2">
              <span className="font-roboto text-[#414141CC]">Provinsi</span>{" "}
              <br />{" "}
              <Select
                placeholder="Select Provinsi"
                // onChange={handleChange}
                style={{ width: "100%" }}
                options={dataProvinsi?.map((item) => ({
                  value: item?.Kd_Provinsi,
                  label: item?.NamaProvinsi,
                }))}
                value={formData.Kd_Provinsi}
                onChange={(e) => setFormData({ ...formData, Kd_Provinsi: e })}
              />
            </div>
            <div className="space-y-2 w-full">
              <span className="font-roboto text-[#414141CC]">
                Kota / Kabupaten
              </span>{" "}
              <br />{" "}
              <Select
                placeholder="Select Kota / Kabupaten"
                // onChange={handleChange}
                style={{ width: "100%" }}
                options={dataKota?.map((item) => ({
                  value: item?.Kd_Kota,
                  label: item?.NamaKota,
                }))}
                value={formData.Kd_Kota}
                onChange={(e) => setFormData({ ...formData, Kd_Kota: e })}
              />
            </div>
          </div>
        ) : null}
        <div className="flex w-full justify-between items-center h-[72px] border-b-[1px]">
          <span
            className={` ${
              isOpen?.riwayat ? "text-[#128ECC]" : "text-[#414141B2]"
            }`}
          >
            Riwayat Pendidikan
          </span>
          <div
            onClick={() => {
              setIsOpen({ ...isOpen, riwayat: !isOpen.riwayat });
            }}
            className="w-[120px] flex justify-end h-[30px] cursor-pointer"
          >
            <Image src={isOpen.riwayat ? minus : plus} />
          </div>
        </div>
        {isOpen?.riwayat ? (
          <>
            <Button
              onClick={async () => {
                await dispatch(setDataTempEditRiwayat({}));
                setIsModalOpen(true);
              }}
              style={{
                border: "1px solid #c4c4c466",
              }}
              icon={<PlusOutlined />}
              className="bg-[#FFFFFF] mt-4 w-[235px] border-none text-[#128ECC] flex items-center"
            >
              Tambah riwayat pendidikan
            </Button>
            {dataRiwayat?.map((item, index) => (
              <div key={index} className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="font-nunito font-medium text-[#414141E5] text-lg">
                    {item?.NamaSekolah}
                  </span>
                  <span className="font-nunito font-light text-[#414141E5] text-base">
                    {item?.LabelPendidikan}
                  </span>
                  <span className="font-nunito font-light text-[#414141B2] text-base">
                    {item?.TanggalMulai} - {item?.TanggalSelesai}
                  </span>
                </div>
                <div>
                  <Image
                    onClick={() => {
                      setIsModalOpen(true);
                      dispatch(setDataTempEditRiwayat(item));
                    }}
                    src={pen}
                    alt="image"
                  />
                </div>
              </div>
            ))}
          </>
        ) : null}

        <div className="flex w-full justify-between items-center h-[72px] border-b-[1px]">
          <span
            className={` ${
              isOpen?.serfikasi ? "text-[#128ECC]" : "text-[#414141B2]"
            }`}
          >
            Sertifikasi
          </span>
          <div
            onClick={() => {
              setIsOpen({ ...isOpen, serfikasi: !isOpen.serfikasi });
            }}
            className="w-[120px] flex justify-end h-[30px] cursor-pointer"
          >
            <Image src={isOpen.serfikasi ? minus : plus} />
          </div>
        </div>
        {isOpen?.serfikasi ? (
          <>
            <Button
              onClick={() => {
                dispatch(setDataTempEditSertifikasi({}));
                setIsModalOpenSertifikasi(true);
              }}
              style={{
                border: "1px solid #c4c4c466",
              }}
              icon={<PlusOutlined />}
              className="bg-[#FFFFFF] mt-4 w-[168px] border-none text-[#128ECC] flex items-center"
            >
              Tambah Serfikasi
            </Button>
            {dataSertifikasi?.map((item, index) => (
              <div key={index} className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="font-nunito font-medium text-[#414141E5] text-lg">
                    {item?.NamaLembaga}
                  </span>
                  <span className="font-nunito font-light text-[#414141E5] text-base">
                    {item?.label}
                  </span>
                </div>
                <div>
                  <Image
                    onClick={() => {
                      setIsModalOpenSertifikasi(true);
                      dispatch(setDataTempEditSertifikasi(item));
                    }}
                    src={pen}
                    alt="image"
                  />
                </div>
              </div>
            ))}
          </>
        ) : null}

        <div className="w-full flex justify-end">
          <Button
            disabled={
              dataRiwayat.length < 1 ||
              dataSertifikasi.length < 1 ||
              Object.values(formData).every((item) => item === "")
            }
            onClick={() => {
              dispatch(
                setDataPayload([
                  ...payload,
                  {
                    ...formData,
                    RiwayatPendidikan: dataRiwayat?.map((item) => ({
                      Kd_Pendidikan: item?.Kd_Pendidikan,
                      NamaSekolah: item?.NamaSekolah,
                      TanggalMulai: item?.TanggalMulai,
                      TanggalSelesai: item?.TanggalSelesai,
                    })),
                    Sertifikasi: dataSertifikasi.map((item) => ({
                      NamaLembaga: item?.NamaLembaga,
                      Id_Bidang: item?.Id_Bidang,
                      DokumenSertifikat: item?.DokumenSertifikat,
                    })),
                  },
                ])
              );
              router.push("/listdatapegawai");
            }}
            style={{
              backgroundColor: "#128ECC",
              border: "none",
              borderRadius: 4,
              width: 121,
              height: 38,
              color: "#FFFFFF",
              marginTop: 25,
            }}
          >
            Simpan
          </Button>
        </div>
      </main>
    </div>
  );
};

datapegawai.propTypes = {};

export default datapegawai;
