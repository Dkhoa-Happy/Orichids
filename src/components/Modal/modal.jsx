/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal as AntdModal } from "antd";

function Modal1({ orichid, trigger }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {trigger && <span onClick={showModal}>{trigger}</span>}{" "}
      {/* Trigger element */}
      <AntdModal
        title={orichid ? orichid.name : "Detail"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {orichid ? (
          <div>
            <p>
              Rating: {orichid.rating} <i className="bx bxs-star"></i>
            </p>
            <p>Special: {orichid.isSpecial ? "Yes" : "No"}</p>
            <p>Color: {orichid.color}</p>
            <p>Origin: {orichid.origin}</p>
            <p>Category: {orichid.category}</p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </AntdModal>
    </div>
  );
}

export default Modal1;
