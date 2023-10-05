"use client";

import { useState, useEffect } from "react";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function MyProfile() {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const handleEdit = (postId) => {
    router.push(`/update-prompt?id=${postId}`);
  };
  const handleDelete = async (postId) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${postId}`, {
          method: "DELETE",
        });

        // Filter out the deleted post
        const filteredPosts = posts.filter((post) => post._id !== postId);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
