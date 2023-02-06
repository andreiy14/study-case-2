import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Modal, Select, Space } from "antd";
import trash from "../../assets/icons/trash.svg";
import Image from "next/image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataRiwayat,
  setDataTempEditRiwayat,
} from "../../stores/action/dataPegawai";
import DeleteConfirmation from "../DeleteConfirmation";

const FormRiwayat = ({ isModalOpen, handleCancel, handleOk, handleDelete }) => {
  const dispatch = useDispatch();
  const { dataRiwayat, dataRiwayatEdit } = useSelector(
    (state) => state.dataPegawai
  );
  const [id, setId] = useState("");
  const dateFormat = "YYYY-MM-DD";
  const dateNow = moment();
  const dates = dateNow.format("YYYY-MM-DD");
  const [formData, setFormData] = useState({
    NamaSekolah: "",
    TanggalMulai: moment(new Date(dates)).format("YYYY-MM-DD"),
    TanggalSelesai: moment(new Date(dates)).format("YYYY-MM-DD"),
    LabelPendidikan: "",
  });
  const [dataJenjang, setDataJenjang] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Object.values(dataRiwayatEdit).length > 0) {
      setFormData(dataRiwayatEdit);
      setId(dataRiwayatEdit.Kd_Pendidikan);
    }
  }, [dataRiwayatEdit]);

  useEffect(() => {
    const dataFilter = dataRiwayat.filter(
      (item) => item.NamaSekolah !== dataRiwayatEdit.NamaSekolah
    );

    setData(dataFilter);
  }, [dataRiwayat, dataRiwayatEdit]);

  const onChangeMulai = (date, dateString) => {
    setFormData({
      ...formData,
      TanggalMulai: moment(new Date(date)).format("YYYY-MM-DD"),
    });
  };
  const onChangeSelesai = (date, dateString) => {
    setFormData({
      ...formData,
      TanggalSelesai: moment(new Date(date)).format("YYYY-MM-DD"),
    });
  };

  useEffect(() => {
    fetch("https://klinikme-test-api.herokuapp.com/api/v1/data_pendidikan ")
      .then((res) => res.json())
      .then((data) => {
        setDataJenjang(data?.data);
      });
  }, []);

  useEffect(() => {
    if (dataJenjang.length > 0) {
      const filter = dataJenjang.filter(
        (item) => item.Pendidikan === formData?.LabelPendidikan
      );

      setId(filter[0]?.Kd_Pendidikan);
    }
  }, [formData.LabelPendidikan]);

  return (
    <Modal
      footer={[]}
      open={isModalOpen}
      onCancel={() => {
        handleCancel();
        setFormData({
          NamaSekolah: "",
          TanggalMulai: moment(new Date(dates)).format("YYYY-MM-DD"),
          TanggalSelesai: moment(new Date(dates)).format("YYYY-MM-DD"),
          LabelPendidikan: "",
        });
      }}
      onOk={handleOk}
      style={{ width: 680 }}
    >
      <span className="text-[#414141E5] font-nunito ">Riwayat Pendidikan</span>
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
          <span className="font-roboto text-[#414141CC]">Jenjang</span>
          <Select
            placeholder="Select Jenjang"
            // onChange={handleChange}
            style={{ width: "100%" }}
            value={formData.LabelPendidikan}
            options={dataJenjang?.map((item) => ({
              value: item?.Pendidikan,
              label: item?.Pendidikan,
            }))}
            onChange={(e) => setFormData({ ...formData, LabelPendidikan: e })}
          />
        </div>
        <div className="space-y-1">
          <span className="font-roboto text-[#414141CC]">Nama Sekolah</span>{" "}
          <br />
          <Input
            onChange={(e) =>
              setFormData({ ...formData, NamaSekolah: e.target.value })
            }
            value={formData.NamaSekolah}
            color="#414141"
            placeholder="Enter name sekolah..."
          />
        </div>
        <div className="space-y-1">
          <span className="font-roboto text-[#414141CC]">Tgl. Mulai</span>{" "}
          <br />
          <DatePicker
            value={dayjs(formData.TanggalMulai, dateFormat)}
            format={dateFormat}
            style={{ width: "100%" }}
            onChange={onChangeMulai}
          />
        </div>
        <div className="space-y-1">
          <span className="font-roboto text-[#414141CC]">Tgl. Selesai</span>{" "}
          <br />
          <DatePicker
            disabledDate={(current) => current < moment(formData.TanggalMulai)}
            style={{ width: "100%" }}
            onChange={onChangeSelesai}
            value={dayjs(formData.TanggalSelesai, dateFormat)}
            format={dateFormat}
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          onClick={() => handleDelete()}
          className="w-[70px] h-[38px] flex items-center justify-between"
        >
          <Image src={trash} alt="img" />
          <span className="font-nunito text-[#414141A6]">Hapuss</span>
        </div>
        <Button
          disabled={
            Object.values(formData).every((item) => item === "") ||
            id === undefined
          }
          style={{
            backgroundColor: "#128ECC",
            border: "none",
            borderRadius: 4,
            width: 121,
            height: 38,
            color: "#FFFFFF",
          }}
          onClick={() => {
            dispatch(setDataTempEditRiwayat({}));
            dispatch(
              setDataRiwayat([...data, { ...formData, Kd_Pendidikan: id }])
            );
            setFormData({
              NamaSekolah: "",
              TanggalMulai: moment(new Date(dates)).format("YYYY-MM-DD"),
              TanggalSelesai: moment(new Date(dates)).format("YYYY-MM-DD"),
              LabelPendidikan: "",
            });
            handleOk();
          }}
        >
          Simpan
        </Button>
      </div>
    </Modal>
  );
};

FormRiwayat.propTypes = {};

export default FormRiwayat;
