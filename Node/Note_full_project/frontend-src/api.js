import { jsPDF } from "jspdf";

const PREFIX = "api";

// const req = (url, options = {}) => {
//   const { body } = options;

//   return fetch((PREFIX + url).replace(/\/\/$/, ""), {
//     ...options,
//     body: body ? JSON.stringify(body) : null,
//     headers: {
//       ...options.headers,
//       ...(body
//         ? {
//             "Content-Type": "application/json",
//           }
//         : null),
//     },
//   }).then((res) =>
//     res.ok
//       ? res.json()
//       : res.text().then((message) => {
//           throw new Error(message);
//         }),
//   );
// };

export const getNotes = async ({ age, search, page }) => {
  try {
    const response = await fetch(
      `${PREFIX}/notes?age=${encodeURIComponent(age)}&search=${encodeURIComponent(search)}&page=${encodeURIComponent(page)}`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Не удается получить список заметок!");
    }

    const data = await response.json();
    return {
      data: data.data,
      hasMore: data.hasMore,
    };
  } catch (error) {
    console.error("Ошибка при получении заметок:", error);
    throw error;
  }
};

export const createNote = async (title, text) => {
  try {
    const response = await fetch(`${PREFIX}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Не удается создать заметку!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при создании заметки:", error);
    throw error;
  }
};

export const getNote = async (id) => {
  try {
    const response = await fetch(`${PREFIX}/notes/${id}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Не удается получить данные по заметке!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении заметки:", error);
    throw error;
  }
};

export const archiveNote = async (id) => {
  try {
    const response = await fetch(`${PREFIX}/notes/${id}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Не удается заархивировать заметку!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при архивации заметки:", error);
    throw error;
  }
};

export const unarchiveNote = async (id) => {
  try {
    const response = await fetch(`${PREFIX}/notes/${id}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = response.text();
      throw new Error(errorText || "Не удается разархивировать заметку!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при разархивации заметки:", error);
    throw error;
  }
};

export const editNote = async (id, title, text) => {
  try {
    const response = await fetch(`${PREFIX}/notes/${id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Не удается получить данные по заметке!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при попытке отредактировать заметку:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${PREFIX}/notes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Не удается удалить заметку!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при попытке удалить заметку:", error);
    throw error;
  }
};

export const deleteAllArchived = async () => {
  try {
    const response = await fetch(`${PREFIX}/notes`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Не удается удалить заметки!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при попытке удалить заметку:", error);
    throw error;
  }
};

export const notePdfUrl = async (id) => {
  try {
    const note = await getNote(id);
    const doc = new jsPDF();
    doc.text(note.title, 20, 20);
    doc.text(note.text, 20, 40);
    doc.save(`note_id-${id}.pdf`);
  } catch (error) {
    console.error("Ошибка при создании PDF:", error);
    throw error;
  }
};
