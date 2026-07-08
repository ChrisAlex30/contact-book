"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handlers/deleteImages.ts
var deleteImages_exports = {};
__export(deleteImages_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(deleteImages_exports);
var import_client_s3 = require("@aws-sdk/client-s3");
var s3 = new import_client_s3.S3Client({});
var handler = async (event) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const {
      contactId,
      userId,
      deletedImages
    } = body.detail;
    console.log(
      `Deleting images for contact ${contactId}`
    );
    for (const key of deletedImages) {
      try {
        await s3.send(
          new import_client_s3.DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=deleteImages.js.map
