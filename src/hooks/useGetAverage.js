// @flow

import * as React from "react";

 function useGetAverage(ratingArray: Array<{stars: number}>) {

    const [average, setAverage] = React.useState(-1)

    React.useEffect(() => {
        function getAverage(arr: Array<{'stars': number}>){
            const len = arr.length;
            if (len === 0) {
              return -1;
            }
            let initialValue = 0;
            const total = arr
              .map(item => item.stars)
              .reduce((totalStars, curr) => totalStars + curr, initialValue);
              setAverage(total / len);
              console.log('avg', total / len)
        }
        getAverage(ratingArray)

    })
    return  average;

}

export default useGetAverage;
