"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";

function UserProfile({ params, searchParams }) {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const username = searchParams.name;
  const userId = params.id;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
}

export default UserProfile;
