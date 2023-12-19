import { ref } from "vue";

const getSingleChapter = (id) => {
  const chapter = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:8000/api/chapter/" + id);
      if (!data.ok) {
        throw Error("Chapter Unavailable At the moment");
      }
      chapter.value = await data.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  const update = async (updatedChapter) => {
    try {
      let response = await fetch("http://localhost:8000/api/chapter/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedChapter),
      });

      if (!response.ok) {
        throw Error("Chapter Update Failed");
      }

      chapter.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };
  const deleteChapter = async () => {
    try {
      let response = await fetch(`http://localhost:8000/api/chapter/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw Error("Chapter Deletion Failed");
      }
      chapter.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { chapter, error, load, update, deleteChapter };
};

export default getSingleChapter;
