import { Button } from "@/components/ui/button";
import { FileUploaderProps } from "@/types";
import { ArrowDownSquare } from "lucide-react";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl?.toString());

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="p-5 overflow-hidden rounded"
      style={{ border: "1px dotted" }}
    >
      <input
        {...getInputProps()}
        className=""
        accept=".jpg, .jpeg, .png, .gif, .svg"
      />

      {fileUrl ? (
        <div className="">
          <div className="">
            <img
              src={fileUrl}
              alt="selected image"
              className="object-cover w-full mx-auto h-60 rounded-xl"
            />
            <Button variant={"secondary"} className="w-full mt-5">
              Click or Drag a photo to replace
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full py-10 overflow-hidden uploader-box rounded-xl">
          <img src="/file-upload.svg" alt="file-upload" />
          {isDragActive && (
            <div
              className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full gap-2"
              style={{ background: "hsla(229, 84%, 5%, 0.8)" }}
            >
              <ArrowDownSquare />
              <p className="text-center">Drop the files here ...</p>
            </div>
          )}
          <p className="text-center">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-sm font-semibold text-center text-gray-500">
            *png - *jpg - *jpeg - *svg -*gif
          </p>
          <Button variant={"secondary"} className="mt-5">
            Select from computer / device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
