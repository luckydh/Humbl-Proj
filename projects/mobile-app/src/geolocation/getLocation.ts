import { Geolocation } from "@capacitor/geolocation";

export default class GeolocationClass {
  getCurrentPosition= async () => {
    const hasPermissions = await Geolocation.checkPermissions();
    if (hasPermissions.location !== "denied" && hasPermissions.location !== "granted") {
      await Geolocation.requestPermissions();
    }
    let coordinates;
    if (hasPermissions.location === "granted") {
      coordinates = await Geolocation.getCurrentPosition();
    }
    return coordinates;
  }
}
