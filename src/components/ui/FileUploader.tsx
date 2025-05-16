"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

type FileUploaderProps = {
  value?: File | string | null; // File object or external URL
  onChange?: (file: File | null) => void;
  onRemove?: () => void;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
};

export default function FileUploader({
  value,
  onChange,
  onRemove,
  accept = "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
  maxSizeMB = 2,
  disabled = false,
}: FileUploaderProps) {
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept,
    maxSize,
  });

  const uploadedFile = files[0]?.file ?? null;

  // Notify parent when a file is uploaded
  useEffect(() => {
    if (uploadedFile && onChange) {
      onChange(uploadedFile as File);
    }
  }, [uploadedFile, onChange]);

  const previewUrl = useMemo(() => {
    if (typeof value === "string") return value;
    if (value instanceof File) return URL.createObjectURL(value);
    if (files[0]?.preview) return files[0].preview;
    return null;
  }, [value, files]);

  const fileName =
    typeof value === "string"
      ? value.split("/").pop()
      : value instanceof File
      ? value.name
      : files[0]?.file.name;

  const handleRemove = () => {
    if (files[0]) removeFile(files[0].id);
    if (onChange) onChange(null);
    if (onRemove) onRemove();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            disabled={disabled}
          />
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={previewUrl}
                alt={fileName || "Uploaded image"}
                className="mx-auto max-h-full rounded object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Drop your image here</p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
              </p>
              <Button
                variant="outline"
                className="mt-4"
                type="button"
                onClick={openFileDialog}
                disabled={disabled}
              >
                <UploadIcon
                  className="-ms-1 size-4 opacity-60"
                  aria-hidden="true"
                />
                Select image
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={handleRemove}
              aria-label="Remove image"
              disabled={disabled}
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
