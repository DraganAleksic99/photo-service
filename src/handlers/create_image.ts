import { ALL_IMAGES } from '../data/image_store';
import { IRequest } from 'itty-router';

type ImageReq = {
	id: string;
	url: string;
	author: string;
};

const createImage = async (req: IRequest) => {
	const imageReq: ImageReq = await req.json();

	const newImage = {
		id: parseInt(imageReq.id),
		url: imageReq.url,
		author: imageReq.author,
	};

	ALL_IMAGES.unshift(newImage);

	return new Response(JSON.stringify(newImage), {
		status: 201,
		headers: {
			'content-type': 'application/json',
		},
	});
};

export default createImage;
