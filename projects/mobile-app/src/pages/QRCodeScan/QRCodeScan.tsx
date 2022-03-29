import React, { useCallback, useEffect, useState } from "react";

import { scanCode } from "../../scanner";
import { Redirect, useHistory } from "react-router";

import Button from "components/Button/Button";

const baseUrl = process.env.REACT_APP_BASE_URL || "https://app.humblpay.com";
const QRCodeScan: React.FC = () => {
  const history = useHistory();

  const [scanData, setScanData] = useState<string | null>(null);

  const openScanner = useCallback(async () => {
    const data = await scanCode();
    //if null, scan was canceled. Return home
    if (data === null) {
      history.goBack();
      return;
    }
    setScanData(data);
  }, [history]);

  useEffect(() => {
    openScanner();
  }, [openScanner]);

  if (scanData) {
    //  Split scanned url, removing humbl url from returned string.
    const accountUrl = scanData.split(baseUrl);
    // If first half is '', that means we split correctly and scanned url matches our base url pattern.
    if (accountUrl[0] !== "") {
      return (
        <div className="content flex-grow justify-center relative">
          <h1 className="my-12 text-white">Error Scanning QR Code. Please try again</h1>
          <Button onClick={openScanner}>Scan Again</Button>
        </div>
      );
    }
    // Correct scan, redirect to profile
    return <Redirect to={accountUrl[1]} push={false} />;
  }
  return <></>;
};

export default QRCodeScan;
