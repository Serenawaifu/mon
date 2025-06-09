// src/components/Forum/ForumPost.js

import React from "react";
import PropTypes from "prop-types";

/**
 * ForumPost - displays a single post content block
 */
export default function ForumPost({ post }) {
  if (!post) return null;

  const { title, content, author, createdAt } = post;

  return (
    <article className="max-w-5xl mx-auto mt-12 px-6 py-8 bg-white rounded-xl shadow-card">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{title}</h1>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-8 text-sm">
        <span>By <strong>{author}</strong></span>
        <time dateTime={new Date(createdAt).toISOString()}>
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
      <section className="prose prose-lg text-gray-700 max-w-none whitespace-pre-wrap">
        {content}
      </section>
    </article>
  );
}

ForumPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]).isRequired,
  }),
};

ForumPost.defaultProps = {
  post: null,
};
