// src/components/Comments/CommentsSection.js

import React from "react";

export default function CommentsSection({ comments = [] }) {
  return (
    <section className="max-w-3xl mx-auto space-y-6 mt-12 bg-white p-6 rounded-xl shadow-card">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h3>

      {comments.length === 0 ? (
        <p className="text-gray-600 italic">Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map(({ id, author, content, createdAt }) => (
            <li
              key={id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{author}</span>
                <time
                  dateTime={new Date(createdAt).toISOString()}
                  className="text-xs text-gray-500"
                >
                  {new Date(createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="text-gray-700">{content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
