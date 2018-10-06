
export const sumTime = (prev, curr) => {
  if (!prev) {
    return curr;
  }

  const prevH = parseInt(prev.h);
  const prevM = parseInt(prev.m);
  const currH = parseInt(curr.h);
  const currM = parseInt(curr.m);
  const aditionalHour = (prevM + currM >= 60) ? 1 : 0;
  return {
    h: prevH + currH + aditionalHour,
    m: aditionalHour > 0 ? (prevM + currM) - 60 : prevM + currM
  };
};
