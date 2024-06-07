import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function PromoAdd() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleAddEvent() {
    setLoading(true);
    axios
      .post("/api/promotion/add", {
        title,
        content,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "새 글이 등록되었습니다.",
          position: "top",
        });
        navigate("/promotion");
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            description: "등록되지 않았습니다. 입력한 내용을 확인하세요.",
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }

  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(<li>{files[i].name}</li>);
  }

  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel>이벤트 제목</FormLabel>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>사진파일</FormLabel>
          <Input
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
          />
        </FormControl>
      </Box>
      <Box>
        <ul>{fileNameList}</ul>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>이벤트 설명</FormLabel>
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="설명을 입력하세요."
          />
        </FormControl>
        <Button
          colorScheme="teal"
          isLoading={loading}
          isDisabled={disableSaveButton}
          onClick={handleAddEvent}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}