"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);

    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex items-center">
        <div
          className="flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt={post.creator.username}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="flex-center copy_btn ml-auto" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={17}
            height={17}
            alt="Copy"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {/* Edit and Delete */}
      {post.creator._id === session?.user.id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post._id)}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
