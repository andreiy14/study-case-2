import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal } from "antd";
import trash from "../../assets/images/trash.png";
import Image from "next/image";

const DeleteConfirmation = ({ isModalOpen, handleCancel, handleOk }) => {
  return (
    <Modal
      closeIcon
      footer={[]}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      className="w-[450px] "
    >
      <div
        //   style={{
        //     display: "flex",
        //     width: "100%",
        //     height: "100%",
        //     justifyContent: "center",
        //     flexDirection: "column",
        //     alignItems: "center",
        //   }}
        className="flex flex-col items-center space-y-4 justify-center h-[250px] lg:h-[292px]"
      >
        <span className="mt-[30px] text-[#414141] text-[20px] font-nunito font-[600]">
          Apakah yakin ingin <br /> menghapus data ini?
        </span>

        <p className="text-center w-[340px] text-[#414141B2]">
          Data yang di hapus akan hilang dan tidak dapat di akses kembali
        </p>
      </div>
      <div className="flex justify-between w-full mt-[20px]">
        <button
          onClick={handleCancel}
          className="w-[172px] bg-[#FFFFFF] h-[38px] rounded-md border-[1px] border-[#128ECC] outline-none text-[#128ECC]"
        >
          Batal
        </button>
        <button
          onClick={handleOk}
          className="w-[172px] bg-[#128ECC] h-[38px] rounded-md border-[1px] border-[#128ECC] outline-none text-[#FFFFFF]"
        >
          Hapus data
        </button>
      </div>
    </Modal>
  );
};

DeleteConfirmation.propTypes = {};

export default DeleteConfirmation;
