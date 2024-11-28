import { Button, Input, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getConfigApi, updateConfigApi } from "../../../api/config";

const Timer = () => {
  const [config, setConfig] = useState({
    timer: 0,
  });

  const getConfig = useCallback(() => {
    getConfigApi().then((response) => {
      setConfig(response.data);
    });
  }, []);

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  const onChnage = (ev: any) => {
    setConfig({ ...config, timer: ev.target.value });
  };

  const updateConfig = () => {
    updateConfigApi(config).then((response) => {
      message.success(response.data.message);
    });
  };

  return (
    <div className="flex flex-col">
      <span>Timer (seconds)</span>
      <Input
        className="w-1/2"
        placeholder="Timer"
        size="large"
        value={config.timer}
        onChange={onChnage}
      />
      <Button
        className="mt-2 w-56"
        type="primary"
        size="large"
        onClick={updateConfig}
      >
        Update
      </Button>
    </div>
  );
};

export default Timer;
