interface IpixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createImage = async (iSource: string) => {
  const image = new Image();
  image.src = iSource;
  return image;
};

const getBase64fileSize = (image: string): number => {
  const y = image.slice(-2) === "==" ? 2 : 1;
  return (image.length * (3 / 4) - y) / 1000000;
};

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image Base64 String
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {Boolean} returnBinary - optional which triggers an object return
 */
export default async function createCroppedImage(
  imageSrc: string,
  pixelCrop: IpixelCrop | null,
  includeBinary?: boolean
): Promise<{ base64image: string; binary?: string; error?: never } | { base64image?: never; error: string }> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  // const maxSize = canvasLimitation;
  // let safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  // let safeArea = 2 * ((maxSize / 3) * Math.sqrt(3));
  const safeArea = maxSize;

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx?.translate(safeArea / 2, safeArea / 2);
  ctx?.rotate(0);
  ctx?.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx?.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
  const data = ctx?.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop?.width || 0;
  canvas.height = pixelCrop?.height || 0;

  // paste generated rotate image with correct offsets for x,y crop values.
  if (data && pixelCrop) {
    ctx?.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    // As Base64 string
    const returnImage = canvas.toDataURL("image/jpeg");
    if (Math.ceil(getBase64fileSize(returnImage)) < 5) {
      if (includeBinary) {
        //
        const [, /* image header */ imageData] = returnImage.split(",");
        const binary = atob(imageData);
        return {
          base64image: returnImage,
          binary,
        };
      }
      return { base64image: returnImage };
    }
  }
  // in case of error return the original image
  return { error: "error" };
}
