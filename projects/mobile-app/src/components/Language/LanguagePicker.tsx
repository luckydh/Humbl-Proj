import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";
import { IonIcon } from "@ionic/react";
import { globeOutline } from "ionicons/icons";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";

interface IProps {
  isOpen?: boolean;
  text?: string;
  onClose?: () => void;
}

export const LanguagePicker: React.FC<IProps> = ({ isOpen = false, text, onClose = () => {} }) => {
  const { t, i18n } = useTranslation();

  const [popoverState, setShowPopover] = useState(false);

  const changeLanguage = (language: string) => {
    trackEvent(EVENTS.CHANGE_LANGUAGE, { language });
    i18n.changeLanguage(language);
    setShowPopover(false);
    onClose();
  };

  useEffect(() => {
    setShowPopover(isOpen);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="mx-auto m-1 text-white text-xl flex flex-col items-center"
        aria-label="CHANGELANGUAGE_BUTTON"
        onClick={() => {
          setShowPopover(true);
        }}>
        <IonIcon icon={globeOutline} className="text-3xl" />
        <span className="text-base">{text || t("core.link.language")}</span>
      </button>

      {popoverState && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition
              show={popoverState}
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                setShowPopover(false);
                onClose();
              }}>
              <div className="absolute inset-0 bg-blue-dark opacity-80" />
            </Transition>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition
              show={popoverState}
              className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 w-60"
              role="dialog"
              aria-modal="true">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mb-4 flex flex-col text-lg">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{t("core.link.language")}</h3>
                    <button
                      type="button"
                      className="text-black m-2"
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        changeLanguage("en");
                      }}>
                      English
                    </button>

                    <button
                      type="button"
                      className="text-black m-2"
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        changeLanguage("es");
                      }}>
                      Español
                    </button>

                    <button
                      type="button"
                      className="text-black m-2"
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        changeLanguage("pt");
                      }}>
                      Português
                    </button>
                    <button
                      type="button"
                      className="text-black m-2"
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        changeLanguage("fr");
                      }}>
                      Français
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      )}
    </>
  );
};
