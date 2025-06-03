import Comment from '../models/comment.model.js';
import Photo from '../models/photo.model.js';

export const getPhotosByUserId = async (userId) => {
    try {
        const photos = await Photo.find({ userId });

        const photosWithComments = await Promise.all(photos.map(async (photo) => {
            const comments = await Comment.find({ photoId: photo._id })
                .populate('userId', 'username first_name last_name') 
                .sort({ day: -1 }); 

            return {
                ...photo.toObject(),
                comments: comments
            };
        }));

        return photosWithComments;
    } catch (error) {
        throw new Error('Error fetching photos with comments: ' + error.message);
    }
};

export const createPhoto = async (photoData) => {
    try {
        const { file_name, userId } = photoData;
        
        const newPhoto = await Photo.create({
            file_name,
            userId
        });

        return newPhoto;
    } catch (error) {
        throw new Error('Error creating photo: ' + error.message);
    }
};


