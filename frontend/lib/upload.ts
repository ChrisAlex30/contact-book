import { apiFetch } from "./api";

export interface UploadRequest {
  fileName: string;
  contentType:
    | "image/jpeg"
    | "image/png"
    | "image/webp"
    | "image/gif";
}

export interface Upload {
  key: string;
  uploadUrl: string;
}

interface GenerateUploadUrlsResponse {
  uploads: Upload[];
}

export function generateUploadUrls(
  files: UploadRequest[]
) {
  return apiFetch<GenerateUploadUrlsResponse>(
    "/uploads/presigned-urls",
    {
      method: "POST",
      body: JSON.stringify({
        files,
      }),
    }
  );
}

export async function uploadFile(
  uploadUrl: string,
  file: File
) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to upload ${file.name}`
    );
  }
}