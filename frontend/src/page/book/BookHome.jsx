import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import BookStack from "../../css/theme/component/stack/BookStack.jsx";
import OuterBookStack from "../../css/theme/component/stack/OuterBookStack.jsx";
import { BookMovieLocationAdd } from "./add/BookMovieLocationAdd.jsx";
import { useState } from "react";
import LargeFontBox from "../../css/theme/component/box/LargeFontBox.jsx";

export function BookHome() {
  const [bookProgress, setBookProgress] = useState(1);

  const [cityList, setCityList] = useState([]);
  const [theaterNumberList, setTheaterNumberList] = useState([]);

  const [movieList, setMovieList] = useState([]);
  const [onScreenList, setOnScreenList] = useState([]);
  const [willScreenList, setWillScreenList] = useState([]);

  const [movieLocationAdd, setMovieLocationAdd] = useState([]);

  return (
    <Center>
      <CenterBox>
        <Heading>빠른예매</Heading>
        <Flex border={"1px solid black"}>
          <BookStack h={"700px"} gap={0}>
            <OuterBookStack
              bgColor={bookProgress === 1 ? "red.500" : ""}
              color={bookProgress === 1 ? "white" : "black"}
            >
              <LargeFontBox>01</LargeFontBox>
              <Box>상영시간</Box>
            </OuterBookStack>
            <OuterBookStack
              bgColor={bookProgress === 2 ? "red.500" : ""}
              color={bookProgress === 2 ? "white" : "black"}
            >
              <LargeFontBox>02</LargeFontBox>
              <Box>인원/좌석</Box>
            </OuterBookStack>
            <OuterBookStack
              bgColor={bookProgress === 3 ? "red.500" : ""}
              color={bookProgress === 3 ? "white" : "black"}
            >
              <LargeFontBox>03</LargeFontBox>
              <Box>결제</Box>
            </OuterBookStack>
            <OuterBookStack
              bgColor={bookProgress === 4 ? "red.500" : ""}
              color={bookProgress === 4 ? "white" : "black"}
            >
              <LargeFontBox>04</LargeFontBox>
              <Box>결제완료</Box>
            </OuterBookStack>
          </BookStack>
          <Outlet
            context={{
              cityList,
              setCityList,
              theaterNumberList,
              setTheaterNumberList,
              movieList,
              setMovieList,
              onScreenList,
              setOnScreenList,
              willScreenList,
              setWillScreenList,
              movieLocationAdd,
              setBookProgress,
            }}
          />
        </Flex>
        <BookMovieLocationAdd
          cityList={cityList}
          setMovieLocationAdd={setMovieLocationAdd}
          movieList={movieList}
          setMovieList={setMovieList}
          onScreenList={onScreenList}
          willScreenList={willScreenList}
        />
      </CenterBox>
    </Center>
  );
}