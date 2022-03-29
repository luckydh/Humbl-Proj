import React from "react";
import { IonPage } from "@ionic/react";
import { Player } from "@lottiefiles/react-lottie-player";

const LoadingSplash: React.FC = () => (
    <IonPage>
      <div className="bg-blue flex flex-col justify-between h-full">
        <Player autoplay loop src="/assets/humbl_07.json" style={{ height: "100vh", width: "100vw" }} speed={1.3} />
      </div>
    </IonPage>
  );

export default LoadingSplash;
