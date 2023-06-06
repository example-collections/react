# React Query Example

json-server와 react-query를 이용하여 react-query 예제를 구현

### npm install

json-server 설치

`npm install -g json-server`

react-query 설치

`npm install react-query`

### json-server 세팅

db.json에 아래와 같이 세팅합니다.

```json
{
  "posts": [
    { "id": 1, "title": "First Post" },
    { "id": 2, "title": "Second Post" },
    { "id": 3, "title": "Third Post" }
  ]
}
```

`json-server --watch db.json --port 3001` 를 통해 json-server 실행하여 mock server를 준비해줍니다.

```json
JSON Server는 CRUD(Create, Read, Update, Delete) 작업을 기본으로 제공하는 간단한 RESTful API를 생성하는 도구입니다. JSON Server는 단일 JSON 파일이나 JavaScript 객체를 기반으로하여 HTTP 요청에 대한 가짜 서버를 구축하는 데 사용됩니다. 이를 통해 클라이언트 애플리케이션을 개발할 때 실제 서버와 통신하지 않고도 가짜 서버를 통해 데이터를 모방하고 테스트할 수 있습니다.

JSON Server를 사용하면 다음과 같은 기본적인 CRUD 작업을 수행할 수 있습니다:

GET: 데이터 조회
POST: 데이터 생성
PUT/PATCH: 데이터 업데이트
DELETE: 데이터 삭제
예를 들어, JSON Server를 사용하여 db.json 파일에 다음과 같은 데이터가 있다고 가정해봅시다:

json
Copy code
{
  "posts": [
    { "id": 1, "title": "First Post" },
    { "id": 2, "title": "Second Post" }
  ]
}
JSON Server를 실행하고 위의 데이터를 사용하여 API 엔드포인트를 생성하면 다음과 같은 CRUD 작업을 수행할 수 있습니다:

GET /posts: 모든 포스트 조회
GET /posts/:id: 특정 ID의 포스트 조회
POST /posts: 새로운 포스트 생성
PUT /posts/:id 또는 PATCH /posts/:id: 특정 ID의 포스트 업데이트
DELETE /posts/:id: 특정 ID의 포스트 삭제
JSON Server는 기본적으로 RESTful API의 명명 규칙을 따르며, 위와 같은 경로와 HTTP 메서드를 사용하여 데이터를 조작할 수 있습니다. CRUD 작업 외에도 정렬, 필터링, 페이징 등의 기능도 JSON Server에서 지원됩니다.
```

### 코드 작성 및 실행

이후부터는 해당 코드를 확인 후 npm run start를 하면 동작 과정을 확인 할 수 있습니다.

`useQuery`: 데이터를 가져오기 위해 사용되는 훅입니다. fetchPosts 함수를 사용하여 mock server에서 데이터를 가져옵니다. useQuery를 통해 데이터를 캐시하고, 필요에 따라 재로딩할 수 있습니다.

```json
useQuery 옵션:

refetchOnWindowFocus: 이 옵션을 false로 설정하면, 윈도우 포커스 시 자동 재로딩을 비활성화할 수 있습니다. 기본적으로 React Query는 윈도우가 포커스를 얻을 때마다 쿼리를 자동으로 다시 가져옵니다. 하지만 refetchOnWindowFocus를 false로 설정하면, 윈도우 포커스 시 자동 재로딩을 비활성화할 수 있습니다.

staleTime: 이 옵션을 사용하면 데이터가 오래된 경우에만 캐시를 사용하고, 백그라운드에서 데이터를 가져올 수 있습니다. staleTime은 데이터가 오래된 시간(밀리초)을 나타냅니다. 예를 들어, staleTime: 60000은 데이터가 1분 이상 오래된 경우에만 캐시를 사용하고, 백그라운드에서 데이터를 가져올 것을 의미합니다.

cacheTime: 이 옵션은 데이터를 캐시에 유지할 시간을 설정합니다. cacheTime은 밀리초 단위로 지정됩니다. 예를 들어, cacheTime: 3600000은 데이터를 1시간 동안 캐시에 유지하라는 의미입니다
```

`useMutation`: 데이터를 업데이트하기 위해 사용되는 훅입니다. updatePost 함수를 사용하여 mock server의 데이터를 업데이트하고, queryClient.invalidateQueries를 호출하여 posts 쿼리의 캐시를 무효화합니다.

```json
useMutation 옵션:

queryClient.invalidateQueries: 데이터를 업데이트한 후, invalidateQueries를 사용하여 쿼리 캐시를 무효화할 수 있습니다. invalidateQueries는 업데이트한 쿼리의 캐시를 무효화하여 다음에 해당 쿼리를 다시 가져올 때 서버에서 새로운 데이터를 가져오도록 합니다. 이 예제에서는 queryClient.invalidateQueries('posts', { exact: true })를 사용하여 정확히 'posts' 쿼리만 무효화하는 예제입니다.

queryClient.refetchQueries: 데이터를 업데이트한 후, refetchQueries를 사용하여 쿼리를 강제로 다시 가져올 수 있습니다. 이는 업데이트된 데이터를 바로 반영하고 업데이트된 내용을 보여주는 데 유용합니다. 이 예제에서는 queryClient.refetchQueries('posts')를 사용하여 'posts' 쿼리를 다시 가져오도록 강제로 재로딩하는 예제입니다.
```

`useQueryClient`: 현재 사용되는 QueryClient의 인스턴스를 얻기 위해 사용되는 훅입니다. useMutation에서 queryClient를 사용하여 쿼리 캐시를 무효화하는 예제를 보여줍니다.
