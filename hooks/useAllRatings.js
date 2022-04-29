import { useEffect, useState } from "react";
import firebase from "../libs/fb";

var db = firebase.firestore();

const useAllRatings = (userId) => {
  const [allRatings, setAllRatings] = useState([]);
  let ratingsArr = [];

  useEffect(() => {
    db.collection("/ratings")
      .where("ratedById", "==", userId)
      .onSnapshot((doc) => {
        doc.forEach((d) => {
          ratingsArr.push(d.data());
        });
        setAllRatings(ratingsArr);
        ratingsArr = [];
      });
  }, []);

  return allRatings;
};

export default useAllRatings;
