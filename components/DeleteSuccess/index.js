import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal } from "antd";
import trash from "../../assets/images/trash.png";
import Image from "next/image";

const DeleteSuccess = ({ isModalOpen, handleCancel, handleOk }) => {
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
        className="flex flex-col items-center justify-center h-[320px] lg:h-[408px]"
      >
        <Image src={trash} />
        <h1 className="mt-[30px] font-nunito font-[600]">
          Data Berhasil Dihapus
        </h1>
      </div>
    </Modal>
  );
};

DeleteSuccess.propTypes = {};

export default DeleteSuccess;
