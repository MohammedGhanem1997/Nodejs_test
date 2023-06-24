const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        path.join(__dirname, '/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, (new Date().toISOString() + file.originalname).replace(/:/g, '-'));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
module.exports=upload