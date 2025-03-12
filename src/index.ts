import { Router } from 'itty-router';
import getImages from './handlers/get_images';
import createImage from './handlers/create_image';
import getSingleImage from './handlers/get_single_image';

const router = Router();

router
	.get('/images', getImages)
	.get('/images/:id', getSingleImage)
	.post('/images', createImage)
	.get('*', () => new Response('Not Found', { status: 404 }));

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return router.fetch(request);
	},
} satisfies ExportedHandler<Env>;
