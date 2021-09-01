import { fetchIngredientsDrink } from '../../services/drinkSearch';

describe('drinkSearch file', () => {
  it('should get response from api', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue('response'),
    });
    const response = await fetchIngredientsDrink();
    expect(response).toBe('response');
  });
});
