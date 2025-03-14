// test/index.spec.ts
import { SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

describe('Photo Service', () => {
	it('returns a 404 if a non-existent endpoint is called', async () => {
		const response = await SELF.fetch('http://www.example.com/invalid-endpoint');
		expect(response.status).toEqual(404);
	});

	describe('GET /images', () => {
		it('returns a 200 OK response', async () => {
			const response = await SELF.fetch('http://www.example.com/images');
			expect(response.status).toEqual(200);
		});

		it('should return images in the response', async () => {
			const response = await SELF.fetch('http://www.example.com/images');
			const json = await response.json();

			expect(json).toEqual(
				expect.arrayContaining([expect.objectContaining({ id: 3, url: 'https://bar.com/img1', author: 'Lara Lobster' })])
			);
		});

		it('should return a set number of images if count is provided', async () => {
			const response = await SELF.fetch('http://www.example.com/images?count=2');
			const json = await response.json();
			expect(json).toHaveLength(2);
		});
	});

	describe('POST /images', () => {
		it('should return a 201 response code', async () => {
			const payload = {
				id: 4,
				url: 'https://example.com/some_image.png',
				author: 'Lia',
			};

			const response = await SELF.fetch('http://www.example.com/images', {
				method: 'POST',
				body: JSON.stringify(payload),
			});
			expect(response.status).toEqual(201);
		});

		it('should return the created image in the response', async () => {
			const newImage = {
				id: 4,
				url: 'https://example.com/some_image.png',
				author: 'Lia',
			};

			const response = await SELF.fetch('http://www.example.com/images', {
				method: 'POST',
				body: JSON.stringify(newImage),
			});
			const json = await response.json();

			expect(json).toEqual(expect.objectContaining(newImage));
		});
	});

	describe('GET /images/:id', () => {
		it('should return a 201 response code', async () => {
			const response = await SELF.fetch('http://www.example.com/images/1');
			expect(response.status).toEqual(201);
		});

		it('should return the image in the response', async () => {
			const response = await SELF.fetch('http://www.example.com/images/1');
			const json = await response.json();

			expect(json).toEqual(
				expect.objectContaining({
					id: 1,
					url: 'https://foo.com/img1',
					author: 'Bart Simpson',
				})
			);
		});
	});
});
