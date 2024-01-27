import React, { useRef, MouseEvent } from "react";
import Editor from "@monaco-editor/react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { output, input, language, disabled } from "@/atom";
import { runCode } from "@/hooks/runCode";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector";
import { showProgress } from "@/atom/showProgressBar";

const App = () => {
  const editorRef = useRef<any | null>(null);
  const inputValue = useRecoilValue(input);
  const languageValue = useRecoilValue(language);
  const [isDisabled, setIsDisabled] = useRecoilState(disabled);
  const setOutputValue = useSetRecoilState(output);
  const [progressState, setProgressState] = useRecoilState(showProgress);
  const handleEditorDidMount = (editor: any) => {
    if (editor) {
      editorRef.current = editor;
    }
  };

  const getCodeContent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editorRef.current || !editorRef.current.getValue) {
      return;
    }
    setProgressState(false);
    setIsDisabled(true);
    setOutputValue("Loading...");
    const code = editorRef.current.getValue();
    const res = await runCode(code, inputValue, languageValue);
    setOutputValue(res);
    setProgressState(true);
    setIsDisabled(false);
  };

  return (
    <div className="h-full border">
      <div className="flex-no-wrap border relative flex w-full items-center justify-between bg-black text-white p-4 lg:flex-wrap">
        <div>
          <LanguageSelector />
        </div>
        <Button disabled={isDisabled} onClick={getCodeContent}>
          Run
        </Button>
      </div>
      <Editor
        key={languageValue}
        height="90vh"
        theme="vs-dark"
        defaultLanguage="c++"
        language={languageValue}
        defaultValue={getDefaultValue(languageValue)}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default App;
const getDefaultValue = (lang: string) => {
  switch (lang) {
    case "c":
      return `
#include<stdio.h>
int main()
{
    printf("\\n");
    return 0;
}`;
    case "c++":
      return `#include <iostream>
using namespace std;

int main() {
  // Start coding here...
  return 0;
}`;
    case "java":
      return `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`;
    case "python":
      return 'print("# Start coding here...")';
    case "javascript":
      return "console.log('// Start coding here...');";
    default:
      return "// Add default code here for unsupported languages...";
  }
};
