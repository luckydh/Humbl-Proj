export async function presentToast(
  message: string,
  duration = 2000,
  color: string
) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = duration;
  toast.color = color;
  toast.cssClass="font-medium text-medium";

  document.body.appendChild(toast);
  return toast.present();
}
