import React, { useState, useEffect } from "react";
import axios from "axios";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import AxiosAuth from "../hooks/AxiosAuth";


const BubblePage = () => {

  const url = "http://localhost:5000/api/colors";

  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await AxiosAuth().get(url);
    const { data } = await result;
    setColorList(data);
    setIsLoading(false);
  };




  useEffect(() => {
    fetchData();
    return () => console.log("The Effect Hook has been cleaned up.");
  }, [url]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList}  />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
