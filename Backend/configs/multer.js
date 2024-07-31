const { constants } = require("../shared/contants");
const multer = require('multer');

const multerFilter = (req, file, cb) => {
    console.log("Mime type :", file.mimetype.split('/')[0]);
    if (file.mimetype.split('/')[0] === 'image' || file.mimetype.split('/')[0] === 'video' || file.mimetype.split('/')[0] === 'audio') {
        cb(null, true);
    } else {
        cb(new Error('Please upload img, audio, or video file only.'), false);
    }
};
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: {
        fileSize: constants.FILE_SIZE, // 50 Mb
    },
});
module.exports = upload;