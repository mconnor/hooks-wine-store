// @flow

import * as React from "react";

type keyType = string;
type Props = {
  [key: keyType]: number
};

function useGetAverage(ratingArray: $ReadOnlyArray<Props>, _name: string) {
  const [value, setValue] = React.useState(-2);

  React.useEffect(() => {
    function getAverage(arr: $ReadOnlyArray<Props>): void {
      let _key;
      console.log("useEffect");
      

     
      if (arr === undefined) return; 
      const len = arr.length;

      if (arr[0]) {
        _key = Object.keys(arr[0])[0];
      }

      const total = arr
        .map(item => item[_key])
        .reduce((runningTotal, curr) => runningTotal + curr, 0);
      setValue(total / len);
    }
    getAverage(ratingArray);
  }, [ratingArray]);

  //return [value, setValue];  // not passing flow test
  return [value];
}

export default useGetAverage;
