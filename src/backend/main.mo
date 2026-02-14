import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Int "mo:core/Int";

actor {
  type Chapter = {
    number : Nat;
    englishTitle : Text;
    sanskritSubtitle : Text;
    verseCount : Nat;
    summary : Text;
    keyInsights : [Text];
  };

  type Verse = {
    chapter : Nat;
    verse : Nat;
    sanskrit : Text;
    hindiMeaning : Text;
    englishMeaning : Text;
    genZKrishnaInterpretation : Text;
    actionStep : Text;
  };

  type Mood = { #anxious; #lost; #angry; #sad; #motivated; #calm };

  type MoodVerseMapping = {
    mood : Mood;
    verseRefs : [(Nat, Nat)];
  };

  type ChatbotResponse = {
    selectedVerse : ?Verse;
    supportiveMessage : Text;
    followUpQuestions : [Text];
    actionStep : Text;
  };

  let verses = Map.empty<Nat, Verse>();
  let verseIndexedByTopic = Map.empty<Text, Verse>();

  func getVerseKey(chapter : Nat, verse : Nat) : Nat {
    chapter * 100 + verse;
  };

  let moodVerseMappings : [MoodVerseMapping] = [
    {
      mood = #anxious;
      verseRefs = [(2, 47), (2, 30), (1, 29), (1, 30)];
    },
    {
      mood = #lost;
      verseRefs = [(2, 47), (2, 30)];
    },
    {
      mood = #angry;
      verseRefs = [(2, 47), (2, 30)];
    },
    {
      mood = #sad;
      verseRefs = [(2, 47), (2, 30)];
    },
    {
      mood = #motivated;
      verseRefs = [(2, 47), (2, 30)];
    },
    {
      mood = #calm;
      verseRefs = [(2, 71), (6, 7)];
    },
  ];

  module Mood {
    public func compare(m1 : Mood, m2 : Mood) : Order.Order {
      let getRank = func(m : Mood) : Nat {
        switch (m) {
          case (#anxious) { 0 };
          case (#lost) { 1 };
          case (#angry) { 2 };
          case (#sad) { 3 };
          case (#motivated) { 4 };
          case (#calm) { 5 };
        };
      };
      Nat.compare(getRank(m1), getRank(m2));
    };
  };

  public query ({ caller }) func getVersesByChapter(chapterNumber : Nat) : async [Verse] {
    if (chapterNumber < 1 or chapterNumber > 18) {
      return [];
    };
    verses.values().toArray().filter(
      func(v) { v.chapter == chapterNumber }
    );
  };

  public query ({ caller }) func getVerse(chapter : Nat, verse : Nat) : async ?Verse {
    if (chapter < 1 or chapter > 18) { return null };
    verses.get(getVerseKey(chapter, verse));
  };

  public query ({ caller }) func getCuratedVersesByMood(mood : Mood) : async [Verse] {
    switch (moodVerseMappings.find(func(m) { Mood.compare(m.mood, mood) == #equal })) {
      case (null) { [] };
      case (?mapping) {
        mapping.verseRefs.map(
          func((chapterRef, verseRef)) {
            verses.get(getVerseKey(chapterRef, verseRef));
          }
        ).filterMap(func(optV) { optV });
      };
    };
  };

  public query ({ caller }) func getTodaysVerse() : async ?Verse {
    let daySeed = (Time.now() % 18) + 1;
    let chapterNum = (daySeed % 18).toNat();
    verses.values().toArray().find(func(v) { v.chapter == chapterNum });
  };

  let topics = [
    "duty",
    "purpose",
    "inner-peace",
    "courage",
    "action",
    "detachment",
    "wisdom",
    "self-realization",
    "meditation",
    "devotion",
    "balance",
    "conquering-mind",
  ];

  let followUpQuestions = [
    "Has anything been on your mind lately?",
    "What usually helps you when you feel this way?",
    "Have you tried any new ways to calm your thoughts?",
  ];

  let moodTaglines : [(Mood, Text)] = [
    (#anxious, "Overthinking, stress, and feeling nervous"),
    (#lost, "Confused, uncertain, need direction"),
    (#angry, "Frustrated, irritated, short-tempered"),
    (#sad, "Feeling low, hurt, or down"),
    (#motivated, "Seeking inspiration and clarity"),
    (#calm, "Wanting more peace and balance"),
  ];

  func findTopicInMessage(message : Text) : ?Text {
    switch (topics.find(func(topic) { message.toLower().contains(#text(topic)) })) {
      case (null) { null };
      case (?topic) { ?topic };
    };
  };

  func getVerseForMood(mood : Mood) : ?Verse {
    switch (moodVerseMappings.find(func(mapping) { Mood.compare(mapping.mood, mood) == #equal })) {
      case (null) { null };
      case (?mapping) {
        let refs = mapping.verseRefs;
        verses.get(getVerseKey(refs[0].0, refs[0].1));
      };
    };
  };

  func getVerseForTopic(topic : Text) : ?Verse {
    verseIndexedByTopic.get(topic);
  };

  func getRandomVerse() : ?Verse {
    let verseArray = verses.values().toArray();
    if (verseArray.size() == 0) { return null };
    let index = Int.abs(Time.now()) % verseArray.size();
    if (index < verseArray.size()) {
      ?verseArray[index];
    } else {
      null;
    };
  };

  func isGreeting(message : Text) : Bool {
    let lower = message.toLower();
    lower == "hey" or lower == "hello" or lower == "hi";
  };

  public shared ({ caller }) func getChatbotResponse(
    userMessage : Text,
    mood : ?Mood,
    _sessionHistory : [Text],
  ) : async ChatbotResponse {
    if (isGreeting(userMessage)) {
      return {
        selectedVerse = null;
        supportiveMessage = "Hey there! It`'`s great to connect with you. \"genuine concern\" Whenever you`'`re ready, I`'`m here to chat. Is there something specific on your mind, or do you just want to explore Bhagavad Gita wisdom?";
        followUpQuestions = [
          "How has your day been so far?",
          "Is there anything weighing on your mind right now?",
        ];
        actionStep = "Take a deep breath and know you`'`re in the right place to find support.";
      };
    };

    let selectedVerse : ?Verse = switch (mood, findTopicInMessage(userMessage)) {
      case (?m, null) { getVerseForMood(m) };
      case (?_m, ?topic) { getVerseForTopic(topic) };
      case (null, ?topic) { getVerseForTopic(topic) };
      case (null, null) { getRandomVerse() };
    };

    let supportiveMessage = switch (selectedVerse) {
      case (null) {
        "I`'`m here to help whenever you need. Let`'`s keep exploring and growing together! Remember, you have what it takes to overcome any challenge.";
      };
      case (?v) {
        "This verse from Chapter " # v.chapter.toText() # " reminds us: \"" # v.genZKrishnaInterpretation # "\"\\n\\n" # "Krishna teaches us the eternal truth that everything is temporary. Stay calm and do your part, everything else will eventually fall in place.";
      };
    };

    let actionStep = switch (selectedVerse) {
      case (?verse) { verse.actionStep };
      case (null) { "Reflect on your current feelings and know that Krishna is always here to guide and support you." };
    };

    {
      selectedVerse;
      supportiveMessage;
      followUpQuestions;
      actionStep;
    };
  };

  public query ({ caller }) func getMoodTaglines() : async [(Mood, Text)] {
    moodTaglines;
  };
};
