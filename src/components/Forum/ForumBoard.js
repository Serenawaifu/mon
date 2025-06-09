// src/components/Forum/ForumBoard.js

import React from "react";
import PropTypes from "prop-types";

/**
 * ForumBoard - lists posts within a forum board
 * posts: Array of { id, title, author, createdAt, commentCount }
 */
export default function ForumBoard({ boardName, posts }) {
  return (
    <section className="max-w-6xl mx-auto mt-16 px-6 py-8 bg-white rounded-xl shadow-card">
      <h2 className="text-5xl font-extrabold text-gray-900 mb-8 capitalize">
        {boardName} Board
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-lg italic">No posts yet. Start the discussion!</p>
      ) : (
        <ul className="space-y-6 divide-y divide-gray-200">
          {posts.map(({ id, title, author, createdAt, commentCount }) => (
            <li key={id} className="pt-4 pb-4">
              <a
                href={`/forum/post/${id}`}
                className="block p-4 rounded-lg hover:bg-gray-50 transition"
                aria-label={`View post titled ${title}`}
              >
                <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
                <div className="mt-1 flex flex-wrap gap-x-4 text-gray-600 text-sm">
                  <span>By <strong>{author}</strong></span>
                  <span>{new Date(createdAt).toLocaleDateString()}</span>
                  <span>{commentCount} comments</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

ForumBoard.propTypes = {
  boardName: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]).isRequired,
      commentCount: PropTypes.number,
    })
  ),
};

ForumBoard.defaultProps = {
  posts: [],
};
