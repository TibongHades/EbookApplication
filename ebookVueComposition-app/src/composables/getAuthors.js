import { ref } from "vue";
const getAuthors = () => {
  const authors = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:8000/api/author");
      if (!data.ok) {
        throw Error("No Data Available");
      }
      authors.value = await data.json();
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { authors, error, load };
};

export default getAuthors;
