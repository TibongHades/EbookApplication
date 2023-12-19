import { ref } from "vue";

const useEditBook = (id) => {
  const book = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch(`http://localhost:8000/api/book/${id}`);
      if (!data.ok) {
        throw Error("Book Unavailable At the moment");
      }
      book.value = await data.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { book, error, load };
};

export default useEditBook;
