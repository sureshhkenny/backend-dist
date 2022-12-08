import Asset from "../entities/Master/Asset";
export default {
  asset_post: async (file_name: string, file_type: string, md5_ext: string) => {
    const url = `https://tts-scratch.s3.ap-south-1.amazonaws.com/${md5_ext}`;
    const asset = Asset.create({ file_type, file_name, md5_ext, url });
    await asset.save();
  },
};
