import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal } from "antd";
import trash from "../../assets/images/trash.png";
import paper from "../../assets/images/paper.png";
import Image from "next/image";

const SendConfirmation = ({
  isModalOpen,
  handleCancel,
  handleOk,
  message = "Pendaftaran Berhasil",
}) => {
  return (
    <Modal
      closeIcon
      footer={[]}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      className="w-[464px] "
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
        className="flex flex-col items-center space-y-4 justify-center h-[400] lg:h-[412px]"
      >
        <Image src={paper} alt="img" />
        <span className="mt-[30px] text-[#414141] text-[20px] font-nunito font-[600]">
          Kirim Data
        </span>

        <p className="text-center w-[400px] text-[#414141B2]">
          Sebelum anda mengirim, pastikan data yang telah anda isi benar dan
          dapat dipertanggungjawabkan. Anda tidak dapat mengubah ataupun
          mengedit data yang telah terkirim
        </p>
      </div>
      <div className="flex justify-center space-x-4 w-full mt-[20px]">
        <button
          onClick={handleCancel}
          className="w-[121px] bg-[#FFFFFF] h-[38px] rounded-md border-[1px] border-[#128ECC] outline-none text-[#128ECC]"
        >
          Batal
        </button>
        <button
          onClick={handleOk}
          className="w-[121px] bg-[#128ECC] h-[38px] rounded-md border-[1px] border-[#128ECC] outline-none text-[#FFFFFF]"
        >
          Kirim
        </button>
      </div>
    </Modal>
  );
};

SendConfirmation.propTypes = {};

export default SendConfirmation;
