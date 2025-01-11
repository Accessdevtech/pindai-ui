type MixedValue = string | number | boolean | object | null | undefined;

const serialize = function (mixedValue: MixedValue): string {
  let val: string;
  let key: string | number;
  let okey: string | number;
  let ktype: string = "";
  let vals: string = "";
  let count: number = 0;

  const _utf8Size = function (str: string): number {
    return ~-encodeURI(str).split(/%..|./).length;
  };

  const _getType = function (inp: MixedValue): string {
    let match: RegExpMatchArray | null;
    let cons: string;
    let types: string[];
    let type: string = typeof inp;

    if (type === "object" && !inp) {
      return "null";
    }

    if (type === "object" && inp !== null && inp !== undefined) {
      if (!inp.constructor) {
        return "object";
      }
      cons = inp.constructor.toString();
      match = cons.match(/(\w+)\(/);
      if (match) {
        cons = match[1].toLowerCase();
      }
      types = ["boolean", "number", "string", "array"];
      for (key in types) {
        if (cons === types[key]) {
          type = types[key];
          break;
        }
      }
    }
    return type;
  };

  const type: string = _getType(mixedValue);

  switch (type) {
    case "function":
      val = "";
      break;
    case "boolean":
      val = "b:" + (mixedValue ? "1" : "0");
      break;
    case "number":
      val =
        (Math.round(mixedValue as number) === mixedValue ? "i" : "d") +
        ":" +
        mixedValue;
      break;
    case "string":
      val = "s:" + _utf8Size(mixedValue as string) + ':"' + mixedValue + '"';
      break;
    case "array":
    case "object":
      val = "a";

      if (typeof mixedValue === "object" && mixedValue !== null) {
        const obj = mixedValue as Record<string, any>;
        for (key in obj) {
          if (mixedValue.hasOwnProperty(key)) {
            ktype = _getType(obj[key]);
            if (ktype === "function") {
              continue;
            }

            okey = key.match(/^[0-9]+$/) ? parseInt(key as string, 10) : key;
            vals += serialize(okey) + serialize(obj[key]);
            count++;
          }
        }
      }

      val += ":" + count + ":{" + vals + "}";
      break;
    case "undefined":
    default:
      val = "N";
      break;
  }
  if (type !== "object" && type !== "array") {
    val += ";";
  }

  return val;
};

export default serialize;
