import { convertFileToUrl } from "@/lib/utils";
import { ProfileUploaderProps } from "@/types";
import { UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div
        className="relative flex flex-col items-center w-24 h-24 overflow-hidden border rounded-full cursor-pointer"
        title="Click or Drag-Drop a photo"
      >
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
          className="object-cover object-top w-full h-full"
        />
        <p
          className="absolute bottom-0 flex justify-center w-full p-1 text-white"
          style={{
            background:
              "linear-gradient(-180deg, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, .8))",
          }}
        >
          <UploadCloud />
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
