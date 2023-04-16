import { Box, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useCreateSectionMutation,
  useUpdateTaskMutation,
  useUpdateTaskPositionMutation,
} from "../redux/service/board";
import { LoadingButton } from "@mui/lab";
import SingleSection from "./SingleSec";

import "../assets/customScroll.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

const Kanban = ({ sections: savedSection }) => {
  const [createSection, { isLoading: createSectionLoading }] =
    useCreateSectionMutation();
  const { boardId } = useParams();
  const [data, setData] = useState([]);

  const { sections } = useSelector((state) => state.board);
  const [updateTaskPosition] = useUpdateTaskPositionMutation();

  useEffect(() => {
    setData(savedSection);
  }, [savedSection]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <LoadingButton
          loading={createSectionLoading}
          onClick={() => createSection(boardId)}
          size="small"
        >
          Add Section
        </LoadingButton>
        <Typography variant="body2" fontWeight="700">
          {sections?.length} section(s)
        </Typography>
      </Box>
      <Divider sx={{ marginY: 1 }} />
      <Box
        sx={{
          display: "flex",
          // alignItems: "flex-start",
          justifyContent: "stretch",
          width: "calc(100vw - 400px)",
          minHeight: "400px",
          overflowX: "auto",
          gap: 3,
        }}
      >
        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination) return;
            const sourceColIndex = data.findIndex(
              (e) => e._id === source.droppableId
            );
            const destinationColIndex = data.findIndex(
              (e) => e._id === destination.droppableId
            );
            const sourceCol = data[sourceColIndex];
            const destinationCol = data[destinationColIndex];

            const sourceSectionId = sourceCol._id;
            const destinationSectionId = destinationCol._id;

            let sourceTasks = [...sourceCol.tasks];
            let destinationTasks = [...destinationCol.tasks];

            if (source.droppableId !== destination.droppableId) {
              const [removed] = sourceTasks.splice(source.index, 1);
              destinationTasks.splice(destination.index, 0, removed);
            } else {
              const [removed] = destinationTasks.splice(source.index, 1);
              destinationTasks.splice(destination.index, 0, removed);
            }
            setData((old) => {
              const newData = [...old];
              newData[sourceColIndex] = {
                ...newData[sourceColIndex],
                tasks: sourceTasks,
              };
              newData[destinationColIndex] = {
                ...newData[destinationColIndex],
                tasks: destinationTasks,
              };
              return newData;
            });
            updateTaskPosition({
              resourceList: sourceTasks,
              destinationList: destinationTasks,
              resourceSectionId: sourceSectionId,
              destinationSectionId: destinationSectionId,
            });
          }}
        >
          {data?.map((section) => {
            return <SingleSection key={section._id} section={section} />;
          })}
        </DragDropContext>
      </Box>
    </>
  );
};

export default Kanban;
