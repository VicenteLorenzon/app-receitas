import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Recipes from "../pages/Recipes";

describe("Recipes", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render recipes", () => {
    const recipes = [
      { id: 1, title: "Recipe 1", image: "recipe1.jpg", rating: 4 },
      { id: 2, title: "Recipe 2", image: "recipe2.jpg", rating: 3 },
    ];

    render(<Recipes />);

    recipes.forEach((recipe) => {
      expect(screen.getByText(recipe.title)).toBeInTheDocument();
    });
  });

  it("should handle search", async () => {
    const searchTerm = "chicken";
    const mockedFetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([]),
    });

    global.fetch = mockedFetch;

    render(<Recipes />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: searchTerm } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      `api/recipes/?search=${searchTerm}`
    );
  });

  it("should handle bookmark toggle", async () => {
    const recipeId = 1;
    const recipe = { id: recipeId, title: "Recipe 1", isBookmarked: false };
    const mockedFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    global.fetch = mockedFetch;

    render(<Recipes />);

    const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
    fireEvent.click(bookmarkButton);

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(`api/bookmarks/${recipeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBookmarked: true }),
    });
  });
});
