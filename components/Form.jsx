import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-col flex-start">
      <h1 className="head_text blue_gradient">{type} Post</h1>

      <p className="desc max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full gap-7 flex-col max-w-2xl glassmorphism"
      >
        <label className="font-satoshi font-semibold text-gray-700 text-base">
          Your AI Prompt
        </label>
        <textarea
          className="form_textarea"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          required
          placeholder="Write your prompt here..."
        />

        <label className="block mt-3 font-satoshi font-semibold text-gray-700 text-base">
          Tag
          <span className="ml-1 font-normal">
            (#product, #webdevelopment, #idea)
          </span>
        </label>
        <textarea
          className="form_input"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          required
          placeholder="#tag"
        />

        <dir className="flex-end mx-3 mb-1 gap-3">
          <Link href="/" className="text-gray-600">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-full bg-blue-600 text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </dir>
      </form>
    </section>
  );
};

export default Form;
