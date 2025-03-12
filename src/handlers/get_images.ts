import { ALL_IMAGES } from '../data/image_store';
import { IRequest } from 'itty-router';

const getImages = (req: IRequest) => {
	let images = ALL_IMAGES;

	if (req.query.count) {
		images = images.slice(0, parseInt(req.query.count[0]));
	}

	return new Response(JSON.stringify(images), {
		headers: {
			'content-type': 'application/json',
		},
	});
};

export default getImages;
