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
      refetchInterval: 5000, // 5초마다 쿼리를 다시 실행
      refetchOnWindowFocus: true, // 윈도우 포커스 될 때마다 새로 fetch
      staleTime: 1000, // 데이터가 fresh -> stale 상태로 변경되는데 걸리는 시간
      cacheTime: 6000, // 캐시에 유지되는 데이터의 유효 시간을 설정
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
      if (!response.ok) {
        console.log(response);
        throw new Error("API 요청에 실패했습니다.");
      }
      return response.json();
    },
    {
      onError: (error) => {
        console.log("API 요청 실패:", error);
      },
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
