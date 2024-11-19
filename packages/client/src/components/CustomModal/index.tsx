import React from "react";
import { Modal, Button } from "antd";

const CustomModal: React.FC<any> = ({
  isVisible,
  icon, // Icon image URL or React component
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <Modal
      open={isVisible}
      footer={null}
      centered
      closable={false}
      style={{ textAlign: "center", padding: "24px" }}
      className="rounded-lg"
    >
      <div className="flex flex-col items-center">
        {icon && (
          <div
            className="flex items-center justify-center w-20 h-20 mb-4 text-5xl"
            style={{ borderRadius: "50%", backgroundColor: "#e7e9ff" }}
          >
            {icon}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-lg text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          {secondaryButtonText && (
            <Button
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={onSecondaryAction}
            >
              {secondaryButtonText}
            </Button>
          )}
          {primaryButtonText && (
            <Button
              type="primary"
              className="bg-blue-500 border-blue-500 hover:bg-blue-600"
              onClick={onPrimaryAction}
            >
              {primaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
