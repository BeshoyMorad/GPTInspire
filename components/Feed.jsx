"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompt = (searchtext) => {
    const regex = new RegExp(searchtext, "i");

    return posts.filter(
      (item) =>
        regex.test(item.prompt) ||
        regex.test(item.tag) ||
        regex.test(item.creator.username)
    );
  };

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);

    const searchResult = filterPrompt(e.target.value);
    setSearchedResults(searchResult);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompt(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="w-full flex-center">
        <input
          type="text"
          className="search_input"
          required
          placeholder="Search for a username or a tag"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
