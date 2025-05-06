import { useState, useEffect } from "react";
import { fetchNoteList } from '../../api/Note';
import { NoteList } from '../../api/Note'

export interface IdleRequestState {
  status: "idle";
}

export interface LoadingRequestState {
  status: "pending";
}

export interface ErrorRequestState {
  status: "error";
  error: unknown;
}

export interface SuccessRequestState {
  status: "success";
  data: NoteList;
  page: number
}

export type RequestState =
  | IdleRequestState
  | LoadingRequestState
  | ErrorRequestState
  | SuccessRequestState;

export function useNoteList(page: number = 1) {
  const [state, setState] = useState<RequestState>({ status: "idle" });

  useEffect(() => {
    if (state.status === "pending") {
      fetchNoteList(page)
        .then((data) => {
          setState({ status: "success", data: data.list, page: page });
        })
        .catch((error) => {
          setState({ status: "error", error });
        });
    }
  }, [page, state]);

  useEffect(() => {
    setState({ status: "pending" });
  }, []);

  const refetch = () => {
    setState({ status: "pending" });
  };

  return {
    state,
    refetch
  }
}
