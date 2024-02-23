<template lang="">
   <div>
      <h1>Страница с постами</h1>
      <my-input
         v-model="data.searchQuery"
         placeholder="Поиск...."
      />
      <div class="app__btns">
         <my-button
            @click="showDialog"
         >
            Создать пользователя
         </my-button>
         <my-select
            v-model="data.selectedSort"
            :options="data.sortOptions"
         />
      </div>
      <my-dialog v-model:show="data.dialogVisible">
         <post-form
            @create="createPost"
         />
      </my-dialog>
      <post-list
         :posts="data.posts"
         @remove="removePost"
         v-if="!data.isPostsLoading"
      />
   </div>
</template>
<script setup lang="ts">
import axios from "axios";

interface DataSchema {
   posts: Post[],
   dialogVisible: boolean;
   isPostsLoading: boolean;
   selectedSort?: "title" | "body";
   searchQuery: string;
   page: number;
   limit: number;
   totalPages: number;
   sortOptions: SortOptions[];

}

interface SortOptions {
   value: string;
   name: string;
}

interface Post {
   userId: number;
   id: number;
   title: string;
   body: string;
}

const data = ref<DataSchema>({
   posts: [],
   dialogVisible: false,
   isPostsLoading: false,
   selectedSort: undefined,
   searchQuery: '',
   page: 1,
   limit: 10,
   totalPages: 0,
   sortOptions: [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По содержимому'},
   ]
});

const createPost = (post: Post) => {
  data.value.posts.push(post);
  data.value.dialogVisible = false;
};

const removePost = (post: Post) => {
  data.value.posts = data.value.posts.filter(p => p.id !== post.id);
};

const showDialog = () => {
   console.log("this is showDialog");
   data.value.dialogVisible = true;
};

// const changePage = (pageNumber) => {
//   page.value = pageNumber;
// };

// const sortedPosts = computed(() => {
//    if (!data.value.selectedSort) {
//       return [...data.value.posts].sort((post1, post2) => post1[data.value.selectedSort]?.localeCompare(post2[data.value.selectedSort]))
//    }
// }
// )

// const sortedAndSearchedPosts = computed(() => 
//    sortedPosts.value.filter(post => post.title.toLowerCase().includes(data.value.searchQuery.toLowerCase()))
// )

const fetchPosts = async () => {
  try {
      data.value.isPostsLoading = true;
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
         params: {
         _page: data.value.page,
         _limit: data.value.page
         }
      });
      data.value.totalPages = Math.ceil(response.headers['x-total-count'] / data.value.page);
      data.value.posts = response.data;
  } catch (e) {
      alert('Ошибка');
  } finally {
      data.value.isPostsLoading = false;
  }
};

const loadMorePosts = async () => {
  try {
    data.value.page += 1;
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: data.value.page,
        _limit: data.value.page
      }
    });
    data.value.totalPages = Math.ceil(response.headers['x-total-count'] / data.value.limit);
    data.value.posts = [...data.value.posts, ...response.data];
  } catch (e) {
    alert('Ошибка');
  }
};

onMounted(() => {
   fetchPosts();
})

</script>

<style scoped lang="css">
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>