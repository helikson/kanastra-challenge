import { ReactNode, createContext, useContext, useReducer } from "react";
import { getFilesFromStorage, saveFilesToStorage } from "./file-storage";

export enum FileActionType {
  SET_FILE = "SET_FILE",
  SET_FILE_LIST = "SET_FILE_LIST",
  SET_LOADING = "SET_LOADING",
  UPLOAD_FILE = "UPLOAD_FILE",
  CLEAR_FILE = "CLEAR_FILE"
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};


type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: File[]; // & {} You can add more information about the challenge inside this type
};

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export const FileContextInitialValues: Partial<FileContextState> = {
  file: {} as File,
  isLoading: false,
  fileList: getFilesFromStorage(),
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.SET_FILE_LIST: {
      const dataFileList = action.payload?.fileList as File[]

      saveFilesToStorage(dataFileList);

      return {
        ...state,
        fileList: dataFileList
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};

