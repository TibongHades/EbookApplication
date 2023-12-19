import { ref } from "vue";
const getChapters = () => {
  const chapters = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:8000/api/chapter");
      if (!data.ok) {
        throw Error("No Data Available");
      }
      chapters.value = await data.json();
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { chapters, error, load };
};

export default getChapters;
