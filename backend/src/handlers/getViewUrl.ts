import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "ap-south-1",
});

export const handler = async (event: any) => {
  const key = event.queryStringParameters?.key;

  if (!key) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Key is required",
      }),
    };
  }

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  const viewUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      viewUrl,
    }),
  };
};