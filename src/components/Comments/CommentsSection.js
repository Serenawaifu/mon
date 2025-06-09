// src/components/Comments/CommentsSection.js

import React, { useState, useEffect } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import PropTypes from "prop-types";

/**
 * CommentsSection - displays a list of comments, loading, and empty states.
 * Expects comments as an array of { id, author, content, createdAt } objects.
 */
export default function CommentsSection({ comments, loading }) {
  return (
    <section
      className="max-w-5xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-card"
      aria-live="polite"
    >
      <h3 className="text-4xl font-extrabold text-gray-900 mb-6">Comments</h3>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin w-10 h-10 text-gray-500" aria-label="Loading comments" />
        </div>
      ) : !comments || comments.length === 0 ? (
        <p className="text-gray-600 italic text-lg">Be the first to comment!</p>
      ) : (
        <ul className="space-y-6">
          {comments.map(({ id, author, content, createdAt }) => (
            <li
              key={id}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                <span className="font-semibold text-gray-800">{author}</span>
                <time
                  dateTime={new Date(createdAt).toISOString()}
                  className="text-sm text-gray-500 mt-2 sm:mt-0"
                >
                  {new Date(createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <p className="text-gray-700 text-base whitespace-pre-wrap">{content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

CommentsSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]).isRequired,
    })
  ),
  loading: PropTypes.bool,
};

CommentsSection.defaultProps = {
  comments: [],
  loading: false,
};
        
