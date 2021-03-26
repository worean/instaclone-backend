import AWS from 'aws-sdk'

AWS.config.update({
    credentials : {
        accessKeyId:process.env.AWS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY,
    }
})

export const uploadS3Server = async (file, userId, path) => {
    const {filename, createReadStream} = await file;
    const readStream = createReadStream();
    const objectName = `${path}/${userId}-${Date.now()}-${filename}`;
    const upload = await new AWS.S3().upload({
        Bucket: "basket8006",
        Key : objectName,
        ACL : "public-read",
        Body : readStream,
    }).promise();
    return upload.Location;
}