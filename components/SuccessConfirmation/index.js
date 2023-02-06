import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal } from "antd";
import check from "../../assets/images/check.png";
import Image from "next/image";

const SuccessConfirmation = ({
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
        onClick={handleCancel}
        //   style={{
        //     display: "flex",
        //     width: "100%",
        //     height: "100%",
        //     justifyContent: "center",
        //     flexDirection: "column",
        //     alignItems: "center",
        //   }}
        className="flex flex-col items-center justify-center h-[320px] lg:h-[408px]"
      >
        <Image src={check} />
        <h1 className="mt-[30px] font-nunito font-[600]">Selamat!</h1>
        <h1 className="font-nunito font-[600]">{message}</h1>
      </div>
    </Modal>
  );
};

SuccessConfirmation.propTypes = {};

export default SuccessConfirmation;
