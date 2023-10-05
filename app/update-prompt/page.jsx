"use client";
import Form from "@/components/Form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitting, setSubmitting] = useState(false);

  const postId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${postId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (postId) fetchPost();
  }, [postId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) {
      return alert("Prompt ID not found");
    }

    try {
      const response = await fetch(`/api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default EditPrompt;
