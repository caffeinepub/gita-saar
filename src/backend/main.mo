import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";

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

  // Instead of storing as persistent state, generate chapters for each query
  func generateFullChapterList() : [Chapter] {
    [
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
      {
        number = 3;
        englishTitle = "Karma Yoga";
        sanskritSubtitle = "Karma Yoga";
        verseCount = 43;
        summary = "Krishna teaches the importance of performing one's duties selflessly.";
        keyInsights = [
          "Action is necessary for spiritual growth.",
          "Attachment leads to suffering.",
        ];
      },
      {
        number = 4;
        englishTitle = "Transcendental Knowledge";
        sanskritSubtitle = "Jnana Yoga";
        verseCount = 42;
        summary = "Krishna reveals the importance of knowledge and sacrifice.";
        keyInsights = [
          "Selfless action purifies the mind.",
          "Knowledge leads to liberation.",
        ];
      },
      {
        number = 5;
        englishTitle = "Path to Renunciation";
        sanskritSubtitle = "Karma Vairagya Yoga";
        verseCount = 29;
        summary = "Krishna explains the path of renunciation and detachment.";
        keyInsights = [
          "Attachment to action is the cause of bondage.",
          "Detachment leads to inner peace.",
        ];
      },
      {
        number = 6;
        englishTitle = "Meditation and Self-Discipline";
        sanskritSubtitle = "Atma Samyama Yoga";
        verseCount = 47;
        summary = "Krishna teaches the practice of meditation and self-control.";
        keyInsights = [
          "Self-discipline is essential for spiritual growth.",
          "Meditation brings lasting peace.",
        ];
      },
      {
        number = 7;
        englishTitle = "Self-Realization";
        sanskritSubtitle = "Jnana Vijnana Yoga";
        verseCount = 30;
        summary = "Krishna reveals the path to self-realization and enlightenment.";
        keyInsights = [
          "Self-realization is the ultimate goal of life.",
          "Enlightenment brings freedom from fear and suffering.",
        ];
      },
      {
        number = 8;
        englishTitle = "Attaining the Supreme";
        sanskritSubtitle = "Aksara Brahma Yoga";
        verseCount = 28;
        summary = "Krishna explains how to attain the Supreme State of being.";
        keyInsights = [
          "The path to the Supreme is open to all.",
          "Faith leads to ultimate liberation.",
        ];
      },
      {
        number = 9;
        englishTitle = "The Sovereign Science";
        sanskritSubtitle = "Raja Vidya Raja Guhya Yoga";
        verseCount = 34;
        summary = "Krishna reveals the supreme knowledge and secrets of life.";
        keyInsights = [
          "The path to wisdom is available to everyone.",
          "Divine love brings eternal fulfillment.",
        ];
      },
      {
        number = 10;
        englishTitle = "Divine Glories";
        sanskritSubtitle = "Vibhuti Yoga";
        verseCount = 42;
        summary = "Krishna describes the divine manifestations of his power.";
        keyInsights = [
          "The Universe is a reflection of the Divine.",
          "True power comes from self-mastery.",
        ];
      },
      {
        number = 11;
        englishTitle = "The Universal Vision";
        sanskritSubtitle = "Visvarupa Darsana Yoga";
        verseCount = 55;
        summary = "Krishna grants Arjuna the divine vision to see the Universe.";
        keyInsights = [
          "Perceiving the Universal Form brings ultimate realization.",
          "Fearlessness is the key to enlightenment.",
        ];
      },
      {
        number = 12;
        englishTitle = "The Path of Devotion";
        sanskritSubtitle = "Bhakti Yoga";
        verseCount = 20;
        summary = "Krishna explains the path of devotion and love.";
        keyInsights = [
          "Devotion is the purest, simplest path to the Divine.",
          "Love conquers all obstacles.",
        ];
      },
      {
        number = 13;
        englishTitle = "The Field and the Knower";
        sanskritSubtitle = "Kshetra Kshetragna Vibhaga Yoga";
        verseCount = 35;
        summary = "Krishna discusses the distinction between the body and the soul.";
        keyInsights = [
          "Self-realization comes from understanding the difference between body and soul.",
          "Detachment leads to lasting peace.",
        ];
      },
      {
        number = 14;
        englishTitle = "Attaining the Supreme";
        sanskritSubtitle = "Gunatraya Vibhaga Yoga";
        verseCount = 27;
        summary = "Krishna describes the three gunas (qualities) of nature.";
        keyInsights = [
          "The three gunas influence all aspects of life.",
          "Transcending the gunas leads to liberation.",
        ];
      },
      {
        number = 15;
        englishTitle = "The Eternal Soul";
        sanskritSubtitle = "Purushottama Yoga";
        verseCount = 20;
        summary = "Krishna explains the eternal nature of the soul.";
        keyInsights = [
          "The soul is beyond birth and death.",
          "The body is temporary, the soul is eternal.",
        ];
      },
      {
        number = 16;
        englishTitle = "Divine and Demoniac Natures";
        sanskritSubtitle = "Daivasura Sampad Vibhaga Yoga";
        verseCount = 24;
        summary = "Krishna compares the divine and demonic qualities in humans.";
        keyInsights = [
          "The divine path leads to spiritual growth.",
          "Anger and negativity lead to suffering.",
        ];
      },
      {
        number = 17;
        englishTitle = "Three Types of Faith";
        sanskritSubtitle = "Shraddhatraya Vibhaga Yoga";
        verseCount = 28;
        summary = "Krishna explains the three types of faith rooted in the gunas.";
        keyInsights = [
          "Faith determines one's actions and results.",
          "Sattvic faith leads to positive outcomes.",
        ];
      },
      {
        number = 18;
        englishTitle = "Liberation Through Renunciation";
        sanskritSubtitle = "Moksha Sanyasa Yoga";
        verseCount = 78;
        summary = "Krishna summarizes the paths to attaining liberation.";
        keyInsights = [
          "Detachment is the foundation of true freedom.",
          "Action and wisdom lead to the ultimate liberation.",
        ];
      },
    ];
  };

  func generateAllVerses() : [Verse] {
    [
      // Chapter 1
      {
        chapter = 1;
        verse = 1;
        sanskrit = "धृतराष्ट्र उवाच । धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।";
        hindiMeaning = "धृतराष्ट्र ने कहा: हे संजय, धर्मभूमि कुरुक्षेत्र में इकट्ठे युद्ध करने की इच्छा रखने वालों ने क्या किया?";
        englishMeaning = "Dhritarashtra asked: O Sanjay, what did my sons and the sons of Pandu do when assembled for battle in Kurukshetra?";
        genZKrishnaInterpretation = "Alright superstar! This is the start of Gita. Arjuna’s exams just started and he’s having full-on emotional breakdown. Total life crisis!";
        actionStep = "Take a deep breath. Reach out to your friends and talk about what’s bothering you.";
      },
      {
        chapter = 2;
        verse = 47;
        sanskrit = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गस्त्वकर्मणि";
        hindiMeaning = "तुम्हारा कर्म करने में ही अधिकार है, उसके फलों में कभी नहीं।";
        englishMeaning = "You have the right to work, but never to the fruits of work.";
        genZKrishnaInterpretation = "Focus on the process, not the outcome. Trust the journey.";
        actionStep = "Identify one thing you can control right now and act on it.";
      },
    ];
  };

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
    generateFullChapterList();
  };

  public query ({ caller }) func getVersesByChapter(chapterNumber : Nat) : async [Verse] {
    generateAllVerses().filter(func(v) { v.chapter == chapterNumber });
  };

  public query ({ caller }) func getVerse(chapter : Nat, verse : Nat) : async ?Verse {
    if (chapter < 1 or chapter > 18) { return null };
    generateAllVerses().find(func(v) { v.chapter == chapter and v.verse == verse });
  };

  public query ({ caller }) func getCuratedVersesByMood(mood : Mood) : async [Verse] {
    switch (moodVerseMappings.find(func(m) { Mood.compare(m.mood, mood) == #equal })) {
      case (null) { [] };
      case (?mapping) {
        mapping.verseRefs.map(
          func(ref) {
            generateAllVerses().find(func(v) { v.chapter == ref.0 and v.verse == ref.1 });
          }
        ).filterMap(func(optV) { optV });
      };
    };
  };

  public query ({ caller }) func getTodaysVerse() : async Verse {
    let daySeed = (Time.now() % 18) + 1;
    let chapterNum = (daySeed % 18).toNat();
    switch (generateAllVerses().find(func(v) { v.chapter == chapterNum })) {
      case (?verse) { verse };
      case (null) { generateAllVerses()[0] };
    };
  };

  public shared ({ caller }) func getChatbotResponse(userMessage : Text, mood : ?Mood, sessionHistory : [Text]) : async ChatbotResponse {
    let selectedVerse = switch (mood) {
      case (?m) {
        switch (moodVerseMappings.find(func(mapping) { Mood.compare(mapping.mood, m) == #equal })) {
          case (null) { generateAllVerses()[0] };
          case (?mapping) {
            let refs = mapping.verseRefs;
            switch (generateAllVerses().find(func(v) { let firstRef = refs[0]; v.chapter == firstRef.0 and v.verse == firstRef.1 })) {
              case (null) { generateAllVerses()[0] };
              case (?v) { v };
            };
          };
        };
      };
      case (null) { generateAllVerses()[0] };
    };

    let supportiveMessage = "I'm here for you! Let's talk it out, step by step.";
    let followUpQuestions = [
      "Has anything been on your mind lately?",
      "What usually helps you when you feel this way?",
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
