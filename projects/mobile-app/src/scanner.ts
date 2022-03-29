import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { assertCameraPermission } from "imageManipulation/captureImage";

export async function scanCode(prompt?: string): Promise<string | null> {
  const canAccessCamera = await assertCameraPermission();

  if (!canAccessCamera) {
    return null;
  }

  const data = await BarcodeScanner.scan({
    showTorchButton: true,
    formats: "QR_CODE",
    prompt: prompt || "Scan a HumblPay QR Code",
  });
  if (data.cancelled) {
    return null;
  }
    return data.text;
}
