<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Categories' | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div v-else class="row">

        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />

        <p v-else class="center">{{'Category_Not_Found' | localize}}</p>

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Loader from '@/components/app/Loader'

export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit, Loader
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
