import classNames from "classnames";
import { useRef, useState } from "react";
import { FaLaptopCode } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";

import { TbReload } from "react-icons/tb";
import { toast } from "react-toastify";
import { defaultHTML } from "../../../utils/consts";

function Preview({
  html,
  isResizing,
  isAiWorking,
  setView,
  ref,
}: {
  html: string;
  isResizing: boolean;
  isAiWorking: boolean;
  setView: React.Dispatch<React.SetStateAction<"editor" | "preview">>;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleRefreshIframe = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const content = iframe.srcdoc;
      iframe.srcdoc = "";
      setTimeout(() => {
        iframe.srcdoc = content;
      }, 10);
    }
  };

  return (
    <div
      ref={ref}
      className={classNames(
        "w-full border-l border-gray-900 bg-gray-950 h-[calc(100dvh-49px)] lg:h-[calc(100dvh-53px)] relative transition-all duration-200",
        {
          "flex items-center justify-center": device === "mobile",
        }
      )}
      onClick={(e) => {
        if (isAiWorking) {
          e.preventDefault();
          e.stopPropagation();
          toast.warn("Please wait for the AI to finish working.");
        }
      }}
    >
      <iframe
        ref={iframeRef}
        title="output"
        className={classNames(
          "w-full select-none transition-all duration-200",
          {
            "pointer-events-none": isResizing || isAiWorking,
            "max-w-md mx-auto h-[80dvh] rounded-[86px] border-[8px] border-black":
              device === "mobile",
            "h-full": device === "desktop",
          }
        )}
        srcDoc={html}
      />
      <div className="flex items-center justify-start gap-3 absolute bottom-3 lg:bottom-5 max-lg:left-3 lg:right-5">
        <button
          className="lg:hidden bg-gray-950 shadow-md text-white text-xs lg:text-sm font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center gap-2 border border-gray-900 hover:brightness-150 transition-all duration-100 cursor-pointer"
          onClick={() => setView("editor")}
        >
          <FaLaptopCode className="text-sm" />
          Hide preview
        </button>
        {html === defaultHTML && (
          <a
            href="https://huggingface.co/spaces/victor/deepsite-gallery"
            target="_blank"
            className="bg-gray-200 text-gray-950 text-xs lg:text-sm font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center gap-2 border border-gray-200 hover:bg-gray-300 transition-all duration-100 cursor-pointer"
          >
            🖼️ <span>DeepSite Gallery</span>
          </a>
        )}
        {html !== defaultHTML && !isAiWorking && (
          <div className="flex items-center rounded-lg p-1 bg-gray-200 relative overflow-hidden z-0 max-lg:hidden">
            <div
              className={classNames(
                "absolute left-1 top-1 rounded-md bg-black w-10 h-8 -z-[1] transition-all duration-200",
                {
                  "translate-x-full": device === "mobile",
                }
              )}
            />
            <button
              className={classNames(
                "rounded-md text-gray-500 w-10 h-8 flex items-center justify-center cursor-pointer",
                {
                  "!text-white": device === "desktop",
                  "hover:bg-gray-300/60": device !== "desktop",
                }
              )}
              onClick={() => setDevice("desktop")}
            >
              <FaLaptopCode className="text-sm" />
            </button>
            <button
              className={classNames(
                "rounded-md text-gray-500 w-10 h-8 flex items-center justify-center cursor-pointer",
                {
                  "!text-white": device === "mobile",
                  "hover:bg-gray-300/60": device !== "mobile",
                }
              )}
              onClick={() => setDevice("mobile")}
            >
              <FaMobileAlt className="text-sm" />
            </button>
          </div>
        )}
        {!isAiWorking && (
          <button
            className="bg-white lg:bg-gray-950 shadow-md text-gray-950 lg:text-white text-xs lg:text-sm font-medium py-2 px-3 lg:px-4 rounded-lg flex items-center gap-2 border border-gray-100 lg:border-gray-900 hover:brightness-150 transition-all duration-100 cursor-pointer"
            onClick={handleRefreshIframe}
          >
            <TbReload className="text-sm" />
            Refresh Preview
          </button>
        )}
      </div>
    </div>
  );
}

export default Preview;
