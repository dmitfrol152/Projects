import { useQuery } from "@tanstack/react-query";
import { fetchNoteList } from "../../api/Note";
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { PageSelector } from "../PageSelector";
import { useState } from "react";
import { Button } from "../Button";

export const FetchNotesListView = () => {
  const [page, setPage] = useState(1)

  const noteListQuery = useQuery({
    queryFn: () => fetchNoteList(page),
    queryKey: ["notes", page],
  });

  const handleNextClick = () => {
    if (!noteListQuery.data) return;
    setPage(prev => prev + 1);
  };

  const handlePrevClick = () => {
    setPage(prev => Math.max(prev - 1, 1))
  };

  switch (noteListQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return (
        <>
          <NotesListView noteList={noteListQuery.data.list} />;
          <PageSelector
            currentPage={page}
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
            canSelectNext={noteListQuery.data.pageCount - 1 > page}
            canSelectPrev={page > 1}
          />
        </>
      );
    case "error":
      return (
        <div>
          <span>Произошла ошибка: {noteListQuery.error.message}</span>

          <Button onClick={() => noteListQuery.refetch()}>
            Повторить запрос
          </Button>
        </div>
      );
  }
};
