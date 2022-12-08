import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import { config } from "dotenv";
config();

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA4WBC3US5TQJQXSA4",
    secretAccessKey: "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",
  },
});

export function uploadImage(file: any, name: string) {
  const uploadParams = {
    Bucket: "tts-scratch",
    Body: file.buffer,
    Key: name,
    ContentType: file.mimetype,
  };
  return s3.send(new PutObjectCommand(uploadParams));
}

export const uploadFile = async (data: any, md5: any, assetType: any) => {
  let decodedImage = Buffer.from(data, "base64");
  try {
    const s3 = new AWS.S3({
      region: "ap-south-1",
      accessKeyId: "AKIA4WBC3US5TQJQXSA4",
      secretAccessKey: "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",
    });
    await s3
      .upload({
        Bucket: "tts-scratch",
        Key: md5,
        Body: decodedImage,
        ContentType: assetType,
        ContentEncoding: "base64",
      })
      .promise();
  } catch (e) {
    console.log(e);
  }
};

// const upload = multer({
//   storage: multerS3({
//     s3: s3Config,
//     bucket: "ap-south-1",
//     metadata: function (_, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (_, file, cb) {
//       console.log(file);
//       cb(null, Date.now().toString());
//     },
//   }),
// });

// export { upload };
