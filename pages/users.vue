<template>
     <div>
    <h1>Страница с постами</h1>
    <my-input
      v-model="data.searchQuery"
      placeholder="Поиск...."
      v-focus
    />
    <div class="app__btns">
      <my-button
        @click="showDialog"
      >
        Создать пользователя
      </my-button>
      <!-- <my-select
        v-model="data.selectedSort"
        :options="data.sortOptions"
      /> -->
    </div>
    <my-dialog v-model:show="data.dialogVisible">
      <post-form
        @create="createPost"
      />
    </my-dialog>
    <post-list
      :posts="data.sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!data.isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <!-- <div v-intersection="loadMorePosts" class="observer"></div> -->
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        :key="pageNumber"-->
    <!--        class="page"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNumber-->
    <!--        }"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script setup>

const data = ref({
   posts: [],
   dialogVisible: false,
   isPostsLoading: false,
   selectedSort: '',
   searchQuery: '',
   page: 1,
   limit: 10,
   totalPages: 0,
   sortOptions: [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По содержимому'},
   ]
});


const createPost = (post) => {
  posts.value.push(post);
  dialogVisible.value = false;
};

const removePost = (post) => {
  posts.value = posts.value.filter(p => p.id !== post.id);
};

const showDialog = () => {
  dialogVisible.value = true;
};

// const changePage = (pageNumber) => {
//   page.value = pageNumber;
// };

const fetchPosts = async () => {
  try {
    isPostsLoading.value = true;
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
        _limit: limit.value
      }
    });
    totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value);
    posts.value = response.data;
  } catch (e) {
    alert('Ошибка');
  } finally {
    isPostsLoading.value = false;
  }
};

const loadMorePosts = async () => {
  try {
    page.value += 1;
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
        _limit: limit.value
      }
    });
    totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value);
    posts.value = [...posts.value, ...response.data];
  } catch (e) {
    alert('Ошибка');
  }
};

onMounted(() => {
//  fetchPosts();
});

</script>
<style lang="css">
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