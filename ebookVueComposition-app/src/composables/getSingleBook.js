import { ref } from "vue";

const getSingleBook = (id) => {
  const book = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch(`http://localhost:8000/api/book/${id}`);
      console.log(data);
      if (!data.ok) {
        throw Error("Book Unavailable At the moment");
      }
      book.value = await data.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  const update = async (updatedBook) => {
    try {
      let response = await fetch(`http://localhost:8000/api/book/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw Error("Book Update Failed");
      }

      book.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  const deleteBook = async () => {
    try {
      let response = await fetch(`http://localhost:8000/api/book/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw Error("Book Deletion Failed");
      }
      book.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { book, error, load, update, deleteBook };
};

export default getSingleBook;
