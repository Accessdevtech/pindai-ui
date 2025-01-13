type MixedValue = string | number | boolean | object | null | undefined

const serialize = function (mixedValue: MixedValue): string {
  let val: string = ""
  let key: string | number
  let ktype: string = ""
  let vals: string = ""
  let count: number = 0

  const _utf8Size = (str: string): number => {
    return ~-encodeURI(str).split(/%..|./).length
  }

  const _getType = (inp: MixedValue): string => {
    if (inp === null) return "null"
    if (Array.isArray(inp)) return "array"
    if (typeof inp === "object") return "object"
    return typeof inp
  }

  const type: string = _getType(mixedValue)

  switch (type) {
    case "function":
      val = ""
      break
    case "boolean":
      val = "b:" + (mixedValue ? "1" : "0")
      break
    case "number":
      val =
        (Math.round(mixedValue as number) === mixedValue ? "i" : "d") +
        ":" +
        mixedValue
      break
    case "string":
      val = "s:" + _utf8Size(mixedValue as string) + ':"' + mixedValue + '"'
      break
    case "array":
      val = "a"

      if (Array.isArray(mixedValue)) {
        for (key = 0; key < mixedValue.length; key++) {
          ktype = _getType(mixedValue[key])
          if (ktype === "function") continue

          vals += serialize(key) + serialize(mixedValue[key])
          count++
        }
      }

      val += ":" + count + ":{" + vals + "}"
      break
    case "object":
      val = "a"

      if (typeof mixedValue === "object" && mixedValue !== null) {
        const obj = mixedValue as Record<string, any>
        for (key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            ktype = _getType(obj[key])
            if (ktype === "function") continue

            const okey = key.match(/^[0-9]+$/) ? parseInt(key, 10) : key
            vals += serialize(okey) + serialize(obj[key])
            count++
          }
        }
      }

      val += ":" + count + ":{" + vals + "}"
      break
    case "undefined":
    default:
      val = "N"
      break
  }

  if (type !== "object" && type !== "array") {
    val += ";"
  }

  return val
}

export default serialize
