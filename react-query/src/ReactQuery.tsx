import { useQuery, useMutation, useQueryClient } from "react-query";

interface Post {
  id: number;
  title: string;
}

function ReactQuery() {
  const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch("http://localhost:3001/posts");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data, error, isFetching } = useQuery<Post[]>(
    "posts",
    fetchPosts,
    {
      refetchOnWindowFocus: true,
      staleTime: 1000,
      cacheTime: 6000,
    }
  );

  const queryClient = useQueryClient();

  const updatePost = async (
    postId: number,
    updatedTitle: string
  ): Promise<void> => {
    await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle }),
    });

    queryClient.invalidateQueries("posts", { exact: true });
  };

  const handleUpdatePost = async (
    postId: number,
    updatedTitle: string
  ): Promise<void> => {
    await updatePost(postId, updatedTitle);
    queryClient.refetchQueries("posts");
  };
  const createPostMutation = useMutation(
    async (newPost: Post) => {
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const handleCreatePost = () => {
    createPostMutation.mutate({ id: Date.now(), title: "New Post" });
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
          {data?.map((post) => (
            <div key={post.id}>
              {post.title}
              <button
                onClick={() => handleUpdatePost(post.id, "Updated Title")}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleCreatePost}>Create Post</button>
      {isFetching && <div>Fetching...</div>}
    </div>
  );
}

export default ReactQuery;
