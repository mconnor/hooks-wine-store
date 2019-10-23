// @flow

import * as React from "react";

type Props = {
    stars: number
};

function useGetAverage(ratingArray: $ReadOnlyArray<Props>) {
  const [value, setValue] = React.useState();
  //console.log('xxx', Object.keys(ratingArray[0]))   //stars
  
  React.useEffect(() => {
    function getAverage(arr: $ReadOnlyArray<Props>):void {
        
      const len = arr.length;
      if (len === 0) return;
      
      //const _key: string = Object.keys(arr[0]);

    //   const firstRating:Props = arr[0];
    //   const _key: stars = Object.keys(firstRating)

      const total = arr
        .map(item => item.stars)
        .reduce((runningTotal, curr) => runningTotal + curr, 0);

      setValue(total / len);
    }
    getAverage(ratingArray);
    //console.log('React.useEffect ', ratingArray[0])  
    
  }, [ratingArray]);

  //return [value, setValue];
  return [value, setValue];
}

export default useGetAverage;
