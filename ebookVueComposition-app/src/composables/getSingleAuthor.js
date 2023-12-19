import { ref } from "vue";

const getSingleAuthor = (id) => {
  const author = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:8000/api/author/" + id);
      if (!data.ok) {
        throw Error("Author Unavailable At the moment");
      }
      author.value = await data.json();
      console.log("Author data:", author.value);
    } catch (err) {
      error.value = err.message;
    }
  };

  const update = async (updatedAuthor) => {
    try {
      let response = await fetch("http://localhost:8000/api/author/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAuthor),
      });

      if (!response.ok) {
        throw Error("Author Update Failed");
      }

      author.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  const deleteBook = async () => {
    try {
      let response = await fetch(`http://localhost:8000/api/author/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw Error("Author Deletion Failed");
      }
      author.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };
  return { author, error, load, update, deleteBook };
};

export default getSingleAuthor;
