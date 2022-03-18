import capitalize from '../utils/capitalize';

test('capitalize works correctly', () => {
  const mockString: string = 'welcome to Wave!';
  const res = capitalize(mockString);

  expect(res).toEqual('Welcome to Wave!');
});
