import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { input, output } from "@/atom";
import { TextareaAutosize } from "@mui/material";

const Console = () => {
  const [inputValue, setInputValue] = useRecoilState(input);
  const outputData = useRecoilValue(output);

  return (
    <div className="bg-black text-white h-full pl-3 py-4 grid gap-3 mt-0 overflow-hidden">
      <div className="pr-6">
        <label
          className="block text-gray-500 font-semibold mb-2"
          htmlFor="inputValue"
        >
          Input :
        </label>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          minLength={1}
          contentEditable={true}
          placeholder="Input Here"
          id="inputValue"
          className="p-1 h-5/6 border-2 outline-0 transition-all bg-black text-white w-full"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </div>
      <div className="pr-6">
        <label
          className="block text-gray-500 font-semibold mb-2"
          htmlFor="outputValue"
        >
          Output :
        </label>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          minLength={1}
          placeholder=""
          
          id="outputValue"
          className="p-1 border-2 h-5/6 outline-0 transition-all bg-black text-white w-full"
          value={outputData}
          readOnly
        />
      </div>
    </div>
  );
};

export default Console;
