import React, { useState, useEffect } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch("/api/bookmarks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const handleBookmarkToggle = async (bookmarkId) => {
    const updatedBookmarks = bookmarks.map((bookmark) => {
      if (bookmark.id === bookmarkId) {
        return {
          ...bookmark,
          isBookmarked: !bookmark.isBookmarked,
        };
      }
      return bookmark;
    });
    setBookmarks(updatedBookmarks);

    try {
      const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle bookmark");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="container">
        <h1 className="mt-4">Bookmarks</h1>
        <div className="row mt-4">
          <div className="col-md-12">
            <ul className="list-group">
              {bookmarks.map((bookmark) => (
                <li
                  className="list-group-item d-flex align-items-start justify-content-between"
                  key={bookmark.id}
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <Link
                      to={`/recipes/${bookmark.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h5>{bookmark.titulo}</h5>
                      <p>{bookmark.descricao}</p>
                    </Link>
                  </div>
                  {bookmark.isBookmarked ? (
                    <BsBookmarkFill
                      size={20}
                      color="black"
                      onClick={() => handleBookmarkToggle(bookmark.id)}
                    />
                  ) : (
                    <BsBookmark
                      size={20}
                      color="black"
                      onClick={() => handleBookmarkToggle(bookmark.id)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookmarks;
