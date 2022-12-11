import StickerApi from './sticker.api'

const mockResponse = [
	{
		"sticker": "sticker0",
		"color": "#316985",
		"position": {
			"x": 463,
			"y": 264
		},
		"note": "asd",
		"user": "Ricardo Beaujon"
	},
	{
		"sticker": "sticker1",
		"color": "#48B80A",
		"position": {
			"x": 182,
			"y": 202
		},
		"note": "asdsd",
		"user": "Ricardo Beaujon"
	}
];

    
beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockResponse)
	})
});

afterEach(() => {
    jest.resetAllMocks(); 
})
  

describe('API Stickers Testing', () => {
	const header = {method: 'GET'}
	test('Should return a JSON file', async () => {
		const json = await StickerApi(header);
		expect(Array.isArray(json)).toEqual(true)
	} )
	test('Should be called with the correct URL', async () => {
		const fetchMock = jest.spyOn(global, 'fetch')
		const URL = "http://localhost:3001/stickers";
		await StickerApi(header);
		expect(fetchMock).toHaveBeenCalledWith(URL)
	})
	test('Should have 2 stickers', async () => {
		const json =await StickerApi(header);
		expect(json.length).toEqual(2)
	})
	
})