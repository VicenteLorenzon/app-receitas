import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetails from '../pages/RecipeDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'your_recipe_id' }),
}));

describe('RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            title: 'Test Recipe',
            description: 'This is a test recipe',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            instructions: 'Test instructions',
            image: 'test_image_url',
          }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders recipe details', async () => {
    render(
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
      expect(screen.getByText('This is a test recipe')).toBeInTheDocument();
      expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
      expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
      expect(screen.getByText('Test instructions')).toBeInTheDocument();
      expect(screen.getByAltText('Test Recipe')).toBeInTheDocument();
    });
  });

  test('toggles bookmark', async () => {
    render(
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      const bookmarkButton = screen.getByRole('button', { name: 'Bookmark' });

      expect(bookmarkButton).toContainElement(screen.getByTestId('bookmark-icon-empty'));

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
        })
      );
      bookmarkButton.click();

      return waitFor(() => {
        expect(bookmarkButton).toContainElement(screen.getByTestId('bookmark-icon-filled'));
      });
    });
  });

  test('handles star rating', async () => {
    render(
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      const starRatingButtons = screen.getAllByRole('button', { name: 'Star' });

      expect(starRatingButtons[0]).toContainElement(screen.getByTestId('star-icon-empty'));

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
        })
      );
      starRatingButtons[2].click();

      return waitFor(() => {
        expect(starRatingButtons[0]).toContainElement(screen.getByTestId('star-icon-filled'));
        expect(starRatingButtons[1]).toContainElement(screen.getByTestId('star-icon-filled'));
        expect(starRatingButtons[2]).toContainElement(screen.getByTestId('star-icon-filled'));
      });
    });
  });

  test('submits comment', async () => {
    render(
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      const commentTextarea = screen.getByPlaceholderText('Write a comment...');
      const sendButton = screen.getByRole('button', { name: 'Send Comment' });

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      );
      fireEvent.change(commentTextarea, { target: { value: 'Test comment' } });
      fireEvent.click(sendButton);

      return waitFor(() => {
        expect(screen.getByText('Test comment')).toBeInTheDocument();
        expect(commentTextarea).toHaveValue('');
      });
    });
  });
});
