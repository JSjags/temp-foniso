export const formatNumber = (arg: number | string) => {
  if (!["number", "string"].includes(typeof arg)) return "0";

  const num = parseFloat(arg.toString());
  const parse = (arg: number, type: string) =>
    `${(num / arg).toFixed(1).replace(".0", "")}${type}`;

  switch (true) {
    case num >= 1000000000000:
      return parse(1000000000000, "T");
    case num >= 1000000000:
      return parse(1000000000, "B");
    case num >= 1000000:
      return parse(1000000, "M");
    case num >= 1000:
      return parse(1000, "K");

    default:
      return `${num}k`;
  }
};
