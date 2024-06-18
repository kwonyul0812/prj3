import { Box, Button, Flex, Select, Stack } from "@chakra-ui/react";
import BookBox from "../../css/theme/component/box/BookBox.jsx";
import OuterBookBox from "../../css/theme/component/box/OuterBookBox.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookTheaterList } from "./list/BookTheaterList.jsx";
import { BookMovieList } from "./list/BookMovieList.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BookDateComponent } from "./date/BookDateComponent.jsx";
import { BookTheaterLocationMovieList } from "./list/BookTheaterLocationMovieList.jsx";

export function Book() {
  const {
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
  } = useOutletContext();

  const navigate = useNavigate();

  const [isCityChecked, setIsCityChecked] = useState("서울");
  const [checkedTheaterNumber, setCheckedTheaterNumber] = useState(0);
  const [checkedMovieId, setCheckedMovieId] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [titleSearch, setTitleSearch] = useState("");

  useEffect(() => {
    setBookProgress(1);

    Promise.all([
      axios.get("/api/theater"),
      axios.get("/api/book/onscreenlist"),
      axios.get("/api/book/willscreenlist"),
    ]).then(([theaterRes, onScreenRes, willScreenRes]) => {
      setCityList(theaterRes.data);
      setOnScreenList(onScreenRes.data);
      setWillScreenList(willScreenRes.data);
    });
  }, [theaterNumberList, movieLocationAdd]);

  return (
    <Stack w={"100%"} h={"500px"}>
      <Flex>
        <OuterBookBox>
          <BookBox>상영 도시/지점명</BookBox>
          <BookBox></BookBox>
          <BookTheaterList
            cityList={cityList}
            theaterNumberList={theaterNumberList}
            setTheaterNumberList={setTheaterNumberList}
            isCityChecked={isCityChecked}
            setIsCityChecked={setIsCityChecked}
            checkedTheaterNumber={checkedTheaterNumber}
            setCheckedTheaterNumber={setCheckedTheaterNumber}
          />
        </OuterBookBox>
        <OuterBookBox>
          <BookBox>영화 선택</BookBox>
          <BookBox>
            <Select>
              <option value={"예매순"}>예매순</option>
              <option value={"관객순"}>관객순</option>
              <option value={"예정작"}>예정작</option>
            </Select>
          </BookBox>
          <Box
            h={"600px"}
            overflow={"scroll"}
            overflowX={"unset"}
            border={"1px solid black"}
          >
            <BookMovieList
              checkedTheaterNumber={checkedTheaterNumber}
              movieLocationAdd={movieLocationAdd}
              onScreenList={onScreenList}
              willScreenList={willScreenList}
              checkedMovieId={checkedMovieId}
              setCheckedMovieId={setCheckedMovieId}
            />
            <Box>
              {movieLocationAdd &&
                movieLocationAdd.map((movie) => (
                  <Box key={movie.movie_id}>{movie.movie_id}</Box>
                ))}
            </Box>
          </Box>
        </OuterBookBox>
        <OuterBookBox>
          <BookDateComponent
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          <Box h={"550px"} border={"1px solid black"}>
            <BookTheaterLocationMovieList
              checkedTheaterNumber={checkedTheaterNumber}
              onScreenList={onScreenList}
              willScreenList={willScreenList}
              checkedMovieId={checkedMovieId}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <Button onClick={() => navigate("/book/theaterseat")}>예매</Button>
          </Box>
        </OuterBookBox>
      </Flex>
    </Stack>
  );
}
