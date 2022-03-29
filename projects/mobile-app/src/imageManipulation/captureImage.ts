import { Camera, CameraDirection, CameraSource, CameraResultType } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { captureException } from "ErrorLogger";

export async function captureImage(cameraDirection = CameraDirection.Front): Promise<string | undefined> {
  const canAccessCamera = await assertCameraPermission();

  if (!canAccessCamera) {
    return;
  }

  try {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      width: 1400,
      preserveAspectRatio: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64,
      direction: cameraDirection,
    });
    const base64Prefix = `data:image/${image.format};base64`;
    return `${base64Prefix}, ${image.base64String}` || "";
  } catch (e) {
    // This is just for the case where PWA photo does not take photo
    // an error gets thrown we just want to swallow here.
    captureException(e);
    throw new Error(e);
  }
}

export async function assertCameraPermission() {
  const platform = Capacitor.getPlatform();

  if (platform === "web") {
    return false;
  }

  let hasPermissions = await Camera.checkPermissions();

  if (hasPermissions.camera !== "denied" && hasPermissions.camera !== "granted") {
    await Camera.requestPermissions();
    hasPermissions = await Camera.checkPermissions();
  }

  return hasPermissions.camera === "granted";
}
