const s3FolderUpload = require("s3-folder-upload");
// or the ES6 way
// import s3FolderUpload from 's3-folder-upload'

const directoryName = "statics";
// I strongly recommend to save your credentials on a JSON or ENV variables, or command line args
const credentials = {
  accessKeyId: "<Your Access Key Id>",
  secretAccessKey: "<Your Secret Access Key>",
  region: "<Your Aimed Region>",
  bucket: "<Your Bucket Name>",
};

// optional options to be passed as parameter to the method
const options = {
  useFoldersForFileTypes: false,
  useIAMRoleCredentials: false,
};

// optional cloudfront invalidation rule
const invalidation = {
  awsDistributionId: "<Your CloudFront Distribution Id>",
  awsInvalidationPath: "<The Path to Invalidate>",
};

s3FolderUpload(directoryName, credentials, options, invalidation);
