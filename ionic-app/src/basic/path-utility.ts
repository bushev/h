export class PathUtility {

  public static concatPath(url: string, url2: string) {
    return this.rtrim('/', url) + "/" + this.ltrim('/', url2);
  }

  private static ltrim(char, str) {
    if (str.slice(0, char.length) === char) {
      return this.ltrim(char, str.slice(char.length));
    } else {
      return str;
    }
  }

  private static rtrim(char, str) {
    if (str.slice(str.length - char.length) === char) {
      return this.rtrim(char, str.slice(0, 0 - char.length));
    } else {
      return str;
    }
  }
}
