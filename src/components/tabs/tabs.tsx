import { useState } from "react";
import classNames from "classnames";
import { IoTimeOutline } from "react-icons/io5";

import Deepseek from "./../../assets/deepseek-color.svg";

function Tabs({
  htmlHistory,
  setHtml,
  children,
}: {
  htmlHistory?: { html: string; createdAt: Date; prompt: string }[];
  setHtml: (html: string) => void;
  children?: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="border-b border-gray-800 pl-4 lg:pl-7 pr-3 flex items-center justify-between">
      <div className="flex items-center justify-start gap-4 flex-1">
        <div
          className="
        space-x-6"
        >
          <button className="rounded-md text-sm cursor-pointer transition-all duration-100 font-medium relative py-2.5 text-white">
            index.html
            <span className="absolute bottom-0 left-0 h-0.5 w-full transition-all duration-100 bg-white" />
          </button>
        </div>
        {htmlHistory && htmlHistory?.length > 1 && (
          <div
            className="relative"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <button
              className={classNames(
                "text-gray-400 hover:text-gray-300 cursor-pointer text-sm nderline flex items-center justify-start gap-1",
                {
                  "!text-gray-300": visible,
                }
              )}
            >
              <IoTimeOutline />
              {htmlHistory?.length} versions
            </button>
            <div
              className={classNames(
                "absolute bottom-0 left-0 min-w-sm w-full z-10 translate-y-full pt-2 transition-all duration-200",
                {
                  "opacity-0 pointer-events-none": !visible,
                }
              )}
            >
              <div className="bg-gray-950 border border-gray-800 rounded-xl shadow-2xs p-4">
                <p className="text-xs font-bold text-white">Version History</p>
                <p className="text-gray-400 text-xs mt-1">
                  This is a list of the full history of what AI has done to
                  this.
                </p>
                <ul className="mt-2 max-h-[250px] overflow-y-auto">
                  {htmlHistory?.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-xs py-2 border-b border-gray-800 last:border-0 flex items-center justify-between gap-2"
                    >
                      <div className="">
                        <span className="line-clamp-1">{item.prompt}</span>
                        <span className="text-gray-500 text-[10px]">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "2-digit",
                            }
                          ) +
                            " " +
                            new Date(item.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                              }
                            )}
                        </span>
                      </div>
                      <button
                        className="bg-pink-500 text-white text-xs font-medium rounded-md px-2 py-1 transition-all duration-100 hover:bg-pink-600 cursor-pointer"
                        onClick={() => {
                          setHtml(item.html);
                        }}
                      >
                        Select
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-3">
        <a
          href="https://huggingface.co/deepseek-ai/DeepSeek-V3-0324"
          target="_blank"
          className="text-[12px] text-gray-300 hover:brightness-120 flex items-center gap-1 font-code"
        >
          Powered by <img src={Deepseek} className="size-5" /> Deepseek
        </a>
        {children}
      </div>
    </div>
  );
}

export default Tabs;
