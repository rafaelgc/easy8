import instructionSet from './instruction-set'

var keywords = instructionSet.map((instruction) => {
  return instruction.mnemotic;
}).join('|');

var regex = new RegExp("(?:" + keywords + ")",);

export default function () {
  return {
    token(stream, state) {
      if (stream.match(regex)) {
        return "keyword"
      } else if (stream.match(/#.*/)) {
        return "comment"
      } else {
        stream.next();
        return null
      }
    }
  }
}