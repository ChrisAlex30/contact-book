import { SQSEvent } from "aws-lambda";
import {
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export const handler = async (
  event: SQSEvent
) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    const {
      contactId,      
      imageKeys
    } = body.detail;

    console.log(
      `Deleting images for contact ${contactId}`
    );

    for (const key of imageKeys) {
      try {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
          })
        );

        console.log(`Deleted ${key}`);
      } catch (err) {
        console.error(
          `Failed deleting ${key}`,
          err
        );

        throw err;
      }
    }
  }
};