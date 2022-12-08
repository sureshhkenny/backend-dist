"use strict";
const s3FolderUpload = require("s3-folder-upload");
const directoryName = "statics";
const credentials = {
    accessKeyId: "<Your Access Key Id>",
    secretAccessKey: "<Your Secret Access Key>",
    region: "<Your Aimed Region>",
    bucket: "<Your Bucket Name>",
};
const options = {
    useFoldersForFileTypes: false,
    useIAMRoleCredentials: false,
};
const invalidation = {
    awsDistributionId: "<Your CloudFront Distribution Id>",
    awsInvalidationPath: "<The Path to Invalidate>",
};
s3FolderUpload(directoryName, credentials, options, invalidation);
//# sourceMappingURL=S3bucket_folder.js.map