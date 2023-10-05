import PromptCard from "./PromptCard";

const Profile = ({ name, data, desc, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient pb-3">{name} profile</h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
        {data?.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
