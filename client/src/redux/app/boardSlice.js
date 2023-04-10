import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], sections: [] };

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.items = [...action.payload];
    },
    setSections: (state, action) => {
      state.sections = [...action.payload];
    },
    moveDraggedItem: (state, action) => {
      const {
        draggedId,
        sectionId,
        task: hoveredTask,
        title: draggedTitle,
      } = action.payload;

      state.sections = state.sections.map((section) => {
        if (section._id === sectionId) {
          const restTask = [...section.tasks].filter(
            (e) => e._id !== draggedId
          );
          section.tasks = restTask;
        }
        if (section._id === hoveredTask.section._id) {
          if (section.tasks.some((e) => e._id === draggedId)) {
            section.tasks = [...section.tasks];
          } else {
            const indexofHovered = [...section.tasks].findIndex(
              (e) => e._id === hoveredTask._id
            );

            const newObj = {
              _id: draggedId,
              section: hoveredTask.section,
              title: draggedTitle,
            };

            const copy = [...section.tasks];

            copy.splice(indexofHovered, 0, newObj);
            section.tasks = copy;
          }
        }
        return section;
      });
    },
  },
});

export const { setBoards, setSections, moveDraggedItem } = boardSlice.actions;

export default boardSlice.reducer;
