const unserialize = (data: string): any => {
  const $global = typeof window !== "undefined" ? window : global;

  const utf8Overhead = (str: string): number => {
    let s: number = str.length;
    for (let i: number = str.length - 1; i >= 0; i--) {
      const code: number = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) {
        s++;
      } else if (code > 0x7ff && code <= 0xffff) {
        s += 2;
      }
      if (code >= 0xdc00 && code <= 0xdfff) {
        i--;
      }
    }
    return s - 1;
  };

  const error = (
    type: string,
    msg: string,
    filename?: string,
    line?: number,
  ): void => {
    throw new ($global as any)[type](msg, filename, line);
  };

  const readUntil = (
    data: string,
    offset: number,
    stopchr: string,
  ): [number, string] => {
    let i: number = 2;
    const buf: string[] = [];
    let chr: string = data.slice(offset, offset + 1);

    while (chr !== stopchr) {
      if (i + offset > data.length) {
        error("Error", "Invalid");
      }
      buf.push(chr);
      chr = data.slice(offset + (i - 1), offset + i);
      i += 1;
    }
    return [buf.length, buf.join("")];
  };

  const readChrs = (
    data: string,
    offset: number,
    length: number,
  ): [number, string] => {
    let i: number;
    let chr: string;
    const buf: string[] = [];

    for (i = 0; i < length; i++) {
      chr = data.slice(offset + (i - 1), offset + i);
      buf.push(chr);
      length -= utf8Overhead(chr);
    }
    return [buf.length, buf.join("")];
  };

  const _unserialize = (
    data: string,
    offset: number,
  ): [string, number, any] => {
    let dtype: string;
    let dataoffset: number;
    let keyandchrs: [number, string];
    let keys: string;
    let contig: boolean;
    let length: number;
    let array: any[];
    let readdata: any;
    let readData: [number, string];
    let ccount: [number, string];
    let stringlength: number;
    let i: number;
    let key: string;
    let kprops: [string, number, string];
    let kchrs: number;
    let vprops: [string, number, any];
    let vchrs: number;
    let value: any;
    let chrs: number = 0;
    let typeconvert: (x: any) => any = (x) => x;

    if (!offset) {
      offset = 0;
    }
    dtype = data.slice(offset, offset + 1).toLowerCase();

    dataoffset = offset + 2;

    switch (dtype) {
      case "i":
        typeconvert = (x: string): number => parseInt(x, 10);
        readData = readUntil(data, dataoffset, ";");
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case "b":
        typeconvert = (x: string): boolean => parseInt(x, 10) !== 0;
        readData = readUntil(data, dataoffset, ";");
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case "d":
        typeconvert = (x: string): number => parseFloat(x);
        readData = readUntil(data, dataoffset, ";");
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case "n":
        readdata = null;
        break;
      case "s":
        ccount = readUntil(data, dataoffset, ":");
        chrs = ccount[0];
        stringlength = parseInt(ccount[1], 10);
        dataoffset += chrs + 2;

        readData = readChrs(data, dataoffset + 1, stringlength);
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 2;
        if (chrs !== stringlength && chrs !== readdata.length) {
          error("SyntaxError", "String length mismatch");
        }
        break;
      case "a":
        readdata = {};

        keyandchrs = readUntil(data, dataoffset, ":");
        chrs = keyandchrs[0];
        keys = keyandchrs[1];
        dataoffset += chrs + 2;

        length = parseInt(keys, 10);
        contig = true;

        for (i = 0; i < length; i++) {
          kprops = _unserialize(data, dataoffset);
          kchrs = kprops[1];
          key = kprops[2];
          dataoffset += kchrs;

          vprops = _unserialize(data, dataoffset);
          vchrs = vprops[1];
          value = vprops[2];
          dataoffset += vchrs;

          if (parseInt(key, 10) !== i) {
            contig = false;
          }

          readdata[key] = value;
        }

        if (contig) {
          array = new Array(length);
          for (i = 0; i < length; i++) {
            array[i] = readdata[i];
          }
          readdata = array;
        }

        dataoffset += 1;
        break;
      default:
        error("SyntaxError", "Unknown / Unhandled data type(s): " + dtype);
        break;
    }
    return [dtype, dataoffset - offset, typeconvert(readdata)];
  };

  return _unserialize(data + "", 0)[2];
};

export default unserialize;
