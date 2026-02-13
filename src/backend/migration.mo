import List "mo:core/List";
import Text "mo:core/Text";

module {
  type OldChapter = {
    number : Nat;
    englishTitle : Text;
    sanskritSubtitle : Text;
    verseCount : Nat;
  };

  type OldActor = {
    chapters : [OldChapter];
  };

  type NewChapter = {
    number : Nat;
    englishTitle : Text;
    sanskritSubtitle : Text;
    verseCount : Nat;
    summary : Text;
    keyInsights : [Text];
  };

  type NewActor = {
    chapters : [NewChapter];
  };

  public func run(old : OldActor) : NewActor {
    let newChapters = old.chapters.map(
      func(oldChapter) {
        {
          number = oldChapter.number;
          englishTitle = oldChapter.englishTitle;
          sanskritSubtitle = oldChapter.sanskritSubtitle;
          verseCount = oldChapter.verseCount;
          summary = "";
          keyInsights = [];
        };
      }
    );
    { chapters = newChapters };
  };
};
