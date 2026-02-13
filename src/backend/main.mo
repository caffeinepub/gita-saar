import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Array "mo:core/Array";

import List "mo:core/List";

// Attach state migration logic using to new actor instance with the with clause

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
    selectedVerse : Verse;
    supportiveMessage : Text;
    followUpQuestions : [Text];
    actionStep : Text;
  };

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

  var chapters : [Chapter] = [
    {
      number = 1;
      englishTitle = "Arjuna’s Crisis";
      sanskritSubtitle = "Arjuna Vishada Yoga";
      verseCount = 47;
      summary = "Arjuna experiences deep conflict about fighting his family members in the battle of Kurukshetra.";
      keyInsights = [
        "It's okay to feel lost and overwhelmed at times.",
        "We must face our crises with courage.",
      ];
    },
    {
      number = 2;
      englishTitle = "Path to Knowledge";
      sanskritSubtitle = "Sankhya Yoga";
      verseCount = 72;
      summary = "Krishna introduces the path of wisdom and the principle of selfless action (Karma Yoga).";
      keyInsights = [
        "Focus on your work, not the results.",
        "Wisdom is the key to achieving peace and fulfillment.",
      ];
    },
  ];

  let verses : [Verse] = [
    {
      chapter = 1;
      verse = 1;
      sanskrit = "धृतराष्ट्र उवाच । धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।";
      hindiMeaning = "धृतराष्ट्र ने कहा: हे संजय, धर्मभूमि कुरुक्षेत्र में इकट्ठे युद्ध करने की इच्छा रखने वालों ने क्या किया?";
      englishMeaning = "Dhritarashtra asked: O Sanjay, what did my sons and the sons of Pandu do when assembled for battle in Kurukshetra?";
      genZKrishnaInterpretation = "Arjuna is having a full-on emotional breakdown.";
      actionStep = "Take a deep breath—talk about what's bothering you.";
    },
    {
      chapter = 2;
      verse = 47;
      sanskrit = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।";
      hindiMeaning = "तुम्हारा कर्म करने में ही अधिकार है, उसके फलों में कभी नहीं।";
      englishMeaning = "You have the right to work, but never to the fruits of work.";
      genZKrishnaInterpretation = "Focus on the process, not the outcome. Trust the journey.";
      actionStep = "Identify one thing you can control right now and act on it.";
    },
  ];

  let moodVerseMappings : [MoodVerseMapping] = [
    {
      mood = #anxious;
      verseRefs = [(2, 47), (2, 30)];
    },
    {
      mood = #calm;
      verseRefs = [(2, 71), (6, 7)];
    },
  ];

  public query ({ caller }) func getAllChapters() : async [Chapter] {
    chapters;
  };

  public query ({ caller }) func getVersesByChapter(chapterNumber : Nat) : async [Verse] {
    verses.filter(func(v) { v.chapter == chapterNumber });
  };

  public query ({ caller }) func getVerse(chapter : Nat, verse : Nat) : async ?Verse {
    verses.find(func(v) { v.chapter == chapter and v.verse == verse });
  };

  public query ({ caller }) func getCuratedVersesByMood(mood : Mood) : async [Verse] {
    switch (moodVerseMappings.find(func(m) { Mood.compare(m.mood, mood) == #equal })) {
      case (null) { [] };
      case (?mapping) {
        mapping.verseRefs.map(
          func(ref) {
            verses.find(func(v) { v.chapter == ref.0 and v.verse == ref.1 });
          }
        ).filterMap(func(optV) { optV });
      };
    };
  };

  public query ({ caller }) func getTodaysVerse() : async Verse {
    let daySeed = (Time.now() % 18) + 1;
    let chapterNum = (daySeed % 18).toNat();
    switch (verses.find(func(v) { v.chapter == chapterNum })) {
      case (?verse) { verse };
      case (null) { verses[0] };
    };
  };

  public shared ({ caller }) func getChatbotResponse(userMessage : Text, mood : ?Mood, sessionHistory : [Text]) : async ChatbotResponse {
    let selectedVerse = switch (mood) {
      case (?m) {
        switch (moodVerseMappings.find(func(mapping) { Mood.compare(mapping.mood, m) == #equal })) {
          case (null) { verses[0] };
          case (?mapping) {
            let refs = mapping.verseRefs;
            switch (verses.find(func(v) { let firstRef = refs[0]; v.chapter == firstRef.0 and v.verse == firstRef.1 })) {
              case (null) { verses[0] };
              case (?v) { v };
            };
          };
        };
      };
      case (null) { verses[0] };
    };

    let supportiveMessage = "Don't stress—Krishna's here for you. Let's take it slow.";

    let followUpQuestions = [
      "What's been weighing on your mind lately?",
      "Have you tried any new ways to calm your thoughts?",
    ];

    {
      selectedVerse;
      supportiveMessage;
      followUpQuestions;
      actionStep = selectedVerse.actionStep;
    };
  };

  public query ({ caller }) func getMoodTaglines() : async [(Mood, Text)] {
    [
      (#anxious, "Overthinking, stress, and feeling nervous"),
      (#lost, "Confused, uncertain, need direction"),
      (#angry, "Frustrated, irritated, short-tempered"),
      (#sad, "Feeling low, hurt, or down"),
      (#motivated, "Seeking inspiration and clarity"),
      (#calm, "Wanting more peace and balance"),
    ];
  };
};
