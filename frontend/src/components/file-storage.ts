interface ILiteFileData {
   name: string;
   type: string;
   size: number;
}

export const saveFilesToStorage = (files: File[]) => {
   const fileMetadataArray = files.map((file: File) => ({
      name: file.name,
      type: file.type,
      size: file.size
   } as ILiteFileData));

   sessionStorage.setItem("BillingFileList", JSON.stringify(fileMetadataArray));
};

export const getFilesFromStorage = () => {
   const fileMetadataArray = JSON.parse(sessionStorage.getItem("BillingFileList") as string) || [];
   return reconstructFilesFromMetadata(fileMetadataArray);
};

const reconstructFilesFromMetadata = (fileMetadataArray: Array<ILiteFileData>) => {
   const reconstructedFiles = fileMetadataArray.map(metadata => {
      const { name, type, size } = metadata;
      const nullableData = new ArrayBuffer(size);
      return new File([nullableData], name, { type });
   });
   return reconstructedFiles;
};

// interface IFileData {
//    name: string;
//    data: ArrayBuffer;
// }

// export const saveFilesToStorage = (files: File[]) => {
//    const reader = new FileReader();
//    const fileDataArray: IFileData[] = [];

//    const saveFile = (index: number) => {
//       if (index < files.length) {
//          reader.onload = (event) => {
//             const fileData = {
//                name: files[index].name,
//                data: event?.target?.result
//             };
//             fileDataArray.push(fileData as IFileData);
//             saveFile(index + 1);
//          };
//          reader.readAsText(files[index]);
//       } else {
//          sessionStorage.setItem("BillingFileList", JSON.stringify(fileDataArray));
//       }
//    };

//    saveFile(0);
// };

// export const getFilesFromStorage = () => {
//    const fileDataArray = JSON.parse(sessionStorage.getItem("BillingFileList") as string) || [];
//    const data = fileDataArray.map((fileData: IFileData) => new File([fileData.data], fileData.name, { type: "text/csv" }));
//    return data;
// };
