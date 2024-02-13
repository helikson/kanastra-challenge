import { ReactNode, createContext, useContext, useReducer } from "react";

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
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.SET_FILE: {
      return {
        ...state,
        file: action.payload?.file as File | null,
        isLoading: false
      };
    }
    case FileActionType.UPLOAD_FILE: {
      return {
        ...state,
        fileList: action.payload?.fileList as File[],
        isLoading: false
      };
    }
    case FileActionType.CLEAR_FILE: {
      return {
        ...state,
        file: null
      }
    }
    case FileActionType.SET_FILE_LIST: {
      return {
        ...state,
        fileList: action.payload?.fileList as File[]
      };
    }
    case FileActionType.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload?.isLoading as boolean
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

