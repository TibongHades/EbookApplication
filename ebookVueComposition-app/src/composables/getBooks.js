import { ref } from "vue";
const getBooks = () => {
  const books = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:8000/api/book");
      if (!data.ok) {
        throw Error("No Data Available");
      }
      books.value = await data.json();
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { books, error, load };
};

export default getBooks;
