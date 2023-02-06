import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, DatePicker, Input, Modal, Select, Space } from "antd";
import trash from "../../assets/icons/trash.svg";
import upload from "../../assets/icons/upload.svg";
import Image from "next/image";
import { API } from "../../config/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataSertifikasi,
  setLoading,
} from "../../stores/action/dataPegawai";
const dataBidang = [
  { value: "01", label: "UI UX Design" },
  { value: "02", label: "Digital Marketing" },
  { value: "03", label: "Data Science" },
  {
    value: "04",
    label: "Full Stack Web Development",
  },
];
const FormSertifikasi = ({
  isModalOpen,
  handleCancel,
  handleOk,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const { dataSertifikasi, isLoading, dataSertifikasiEdit } = useSelector(
    (state) => state.dataPegawai
  );
  const [formData, setFormData] = useState({
    NamaLembaga: "",
    Id_Bidang: "",
    DokumenSertifikat: null,
  });
  const [label, setLabel] = useState("");
  const [isMaks, setIsMaks] = useState(false);
  const [data, setData] = useState([]);

  const handleFile = async (e) => {
    if (e?.target?.files?.length > 0) {
      const file = await e?.target?.files[0];
      setFormData({ ...formData, DokumenSertifikat: file });
    }
  };

  useEffect(() => {
    const dataFilter = dataSertifikasi.filter(
      (item) => item.NamaLembaga !== dataSertifikasiEdit.NamaLembaga
    );
    setData(dataFilter);
  }, [dataSertifikasi, dataSertifikasiEdit]);
  useEffect(() => {
    if (formData?.DokumenSertifikat?.size > 1 * 1024 * 1024) {
      setIsMaks(true);
    } else {
      setIsMaks(false);
    }
  }, [formData?.DokumenSertifikat]);

  useEffect(() => {
    const data = dataBidang.filter((item) => item.value === formData.Id_Bidang);

    if (data.length > 0) {
      setLabel(data[0]?.label);
    }
  }, [formData.Id_Bidang]);

  useEffect(() => {
    if (Object.values(dataSertifikasiEdit).length > 0) {
      setFormData({
        NamaLembaga: dataSertifikasiEdit?.NamaLembaga,
        Id_Bidang: dataSertifikasiEdit?.Id_Bidang,
        DokumenSertifikat: dataSertifikasiEdit?.DokumenSertifikat,
      });
      setLabel(dataSertifikasiEdit?.label);
    }
  }, [dataSertifikasiEdit]);

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const forms = new FormData();
      forms.append("image", formData.DokumenSertifikat);
      dispatch(setLoading(true));
      const response = await axios.post(
        "https://0ad9-180-252-170-243.ap.ngrok.io/api/v1/upload_image",
        forms,
        config
      );
      dispatch(setLoading(false));
      if (response.status === 200) {
        const dataPayload = {
          ...formData,
          DokumenSertifikat: response?.data?.data?.linkImage,
          label,
        };
        dispatch(setDataSertifikasi([...data, dataPayload]));
        handleOk();
        handleCancel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      footer={[]}
      open={isModalOpen}
      onCancel={() => {
        setFormData({
          NamaLembaga: "",
          Id_Bidang: "",
          DokumenSertifikat: null,
        });
        setLabel("");
        handleCancel();
      }}
      style={{ width: 680 }}
    >
      <span className="text-[#414141E5] font-nunito ">Sertifikasi</span>
      <div
        //   style={{
        //     display: "flex",
        //     width: "100%",
        //     height: "100%",
        //     justifyContent: "center",
        //     flexDirection: "column",
        //     alignItems: "center",
        //   }}
        className="flex flex-col mt-4 space-y-4 h-[320px] lg:h-[408px]"
      >
        <div className="space-y-1">
          <span className="font-roboto text-[#414141CC]">Nama Lembaga</span>{" "}
          <br />
          <Input
            value={formData.NamaLembaga}
            onChange={(e) =>
              setFormData({ ...formData, NamaLembaga: e.target.value })
            }
            color="#414141"
            placeholder="Enter name lembaga..."
          />
        </div>
        <div className="space-y-1">
          <span className="font-roboto text-[#414141CC]">Bidang</span>
          <Select
            placeholder="Select Bidang"
            // onChange={handleChange}
            style={{ width: "100%" }}
            options={dataBidang}
            value={formData.Id_Bidang}
            onChange={(e) => setFormData({ ...formData, Id_Bidang: e })}
          />
        </div>
        <div className="space-y-1">
          <span className="font-roboto text-[#414141CC]">
            Unggah Sertifikat
          </span>
          <div className="flex flex-col h-[140px] w-full border-[1px] rounded  border-[#c4c4c4cc] justify-center items-center">
            <Image src={upload} alt="img" />
            <div
              for="upload"
              className="h-[30px] w-[115px] border-[1px] border-[#128ECC] text-[#128ECC] flex justify-center items-center rounded mt-4 cursor-pointer"
            >
              <label className="cursor-pointer" for="upload">
                {" "}
                <input
                  onChange={handleFile}
                  className="hidden"
                  id="upload"
                  label="Standard"
                  type="file"
                  accept="image/*"
                />
                Pilih Foto
              </label>
            </div>
            <span
              className={`font-nunito font-[400] mt-3 ${
                isMaks ? "text-red-600" : "text-[#414141B2]"
              } `}
            >
              Size max. 5 MB
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          onClick={handleDelete}
          className="w-[70px] h-[38px] cursor-pointer flex items-center justify-between"
        >
          <Image src={trash} alt="img" />
          <span className="font-nunito text-[#414141A6]">Hapus</span>
        </div>
        <Button
          disabled={
            isMaks ||
            Object.values(formData).every(
              (item) => item === "" || item === null
            ) ||
            isLoading
          }
          onClick={() => {
            setLabel("");
            setFormData({
              NamaLembaga: "",
              Id_Bidang: "",
              DokumenSertifikat: null,
            });
            if (typeof formData.DokumenSertifikat === "string") {
              const dataPayload = {
                ...formData,
                label,
              };
              dispatch(setDataSertifikasi([...data, dataPayload]));
              handleOk();
            } else {
              handleSubmit();
            }
          }}
          style={{
            backgroundColor: "#128ECC",
            border: "none",
            borderRadius: 4,
            width: 121,
            height: 38,
            color: "#FFFFFF",
          }}
        >
          Simpan
        </Button>
      </div>
    </Modal>
  );
};

FormSertifikasi.propTypes = {};

export default FormSertifikasi;
