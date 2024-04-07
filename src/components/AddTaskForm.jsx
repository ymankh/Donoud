import { useContext, useState } from "react";
import TasksContext from "../contexts/TasksContext";
import { Bounce, toast } from "react-toastify";

function randomEmoji() {
  const emojis = ["😐", "😑", "😬", "🙄", "🙅‍♀️", "🤷‍♂️", "💁‍♂️", "🚶‍♂️", "👀", "🤦‍♀️"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function readingSentence() {
  const sentences = [
    "Discover new worlds through reading. 🌍📚",
    "Books are portals to endless adventures. 📖✨",
    "Escape reality, one page at a time. 🚀📖",
    "Reading fuels the imagination like nothing else. 💭📚",
    "Open a book and unlock your mind's potential. 📖🔑",
    "Find solace and inspiration in the pages of a book. 📚💫",
    "Let words whisk you away on a journey of discovery. 🌟📚",
    "Reading is the key to endless learning and growth. 📖🌱",
    "Lose yourself in a story and find yourself in the process. 📚💫",
    "Embrace the magic of reading and watch your world expand. ✨📖",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function meditationSentence() {
  const sentences = [
    "Find tranquility in meditation. 🧘‍♂️",
    "Let go of stress, find inner peace. 🌿",
    "Quiet your mind, embrace harmony. 🕊️",
    "Connect with your inner self. 🌌",
    "Embrace the present moment. 🌟",
    "Discover balance through meditation. ⚖️",
    "Create a peaceful space within. 🌿",
    "Explore your consciousness. 🧠",
    "Release tension, find wholeness. 💆‍♀️",
    "Experience the rhythm of your breath. 🌬️",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function prayerSentences() {
  const sentences = [
    "Find spiritual connection in prayer. 🤲",
    "Seek guidance through Salah. 🕌",
    "Nurture your soul with prayer. 🌟",
    "Feel the presence of Allah in your prayers. 💫",
    "Strengthen your faith through Salah. 🙏",
    "Experience peace through prayer. 🕋",
    "Submit to the will of Allah in Salah. 🌙",
    "Connect with the divine in prayer. 🌌",
    "Experience tranquility in Salah. 🧘‍♂️",
    "Embrace the blessings of prayer. 🙌",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function learningSentences() {
  const sentences = [
    "Expand your mind through learning. 📚",
    "Embrace knowledge and grow. 🌱",
    "Unlock your potential with learning. 🔓",
    "Illuminate your path with learning. 💡",
    "Discover the joy of lifelong learning. 🌟",
    "Feed your curiosity through education. 🧠",
    "Empower yourself through knowledge. 💪",
    "Transform yourself through learning. 🌈",
    "Embrace the journey of learning. 🚀",
    "Let learning be your superpower. 💥",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function gratitudeSentences() {
  const sentences = [
    "Thank you for always being there. 🙏",
    "I'm grateful for your unwavering support. ❤️",
    "Your kindness means the world to me. 🌍",
    "I appreciate everything you do. 🌟",
    "Thank you for your generosity and compassion. 🌼",
    "I'm thankful to have you in my life. 🤗",
    "Your guidance has made a difference. 🌟",
    "I'm grateful for your understanding and patience. 🙌",
    "Thank you for being a source of inspiration. 💫",
    "Your presence brings joy to my life. 😊",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function writingSentences() {
  const sentences = [
    "Express yourself through writing. ✍️",
    "Let your creativity flow onto the page. 🌊",
    "Discover the power of words. 📝",
    "Capture your thoughts with pen and paper. 📓",
    "Explore the depths of your imagination through writing. 🌌",
    "Find solace in the act of writing. 📚",
    "Create worlds with your words. 🌎",
    "Embrace the freedom of self-expression. 🕊️",
    "Write your story, one word at a time. 📖",
    "Unleash the magic of storytelling through writing. ✨",
    "I'm incredibly proud of you. ✍️🌟",
    "how proud I am of your talent. 🌊📝",
    "I am immensely proud. 📝💫",
    "you make me proud every day. 📓🌟",
    "I'm proud to witness your creativity. 🌌✍️",
    "your dedication makes me so proud. 📚🌟",
    "I'm proud of your courage to share your thoughts. 🕊️📓",
    "each step you take toward your goals fills me with pride. 📖🌟",
    "you inspire others. ✨📝",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function familySentences() {
  const sentences = [
    "Family's foundation, your presence enriches each moment. ❤️👨‍👩‍👧‍👦",
    "Your love and support bless your family immensely. 🏠❤️",
    "Invaluable to your family, your kindness strengthens bonds. 💎👨‍👩‍👧‍👦",
    "Your laughter brightens, your love nurtures, family is complete. 🌟👨‍👩‍👧‍👦",
    "Family thrives, you're the heart and soul. 💪❤️",
    "Family's joy, your presence paints life with colors. 🌷👨‍👩‍👧‍👦",
    "You're family's strength, the light in darkness. 💪🌟",
    "Your family's treasure, your love fills each day. ❤️🌟",
    "Your family's masterpiece, your essence enriches every moment. 🎨👨‍👩‍👧‍👦",
    "Beloved in your family, you make every day brighter. ❤️🌟",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function mealSentences() {
  const sentences = [
    "Enjoy your meal! 🍽️ Bon appétit!",
    "Wishing you a delicious meal! 🍲",
    "May your meal be as delightful as your company! 🥂",
    "Bon appétit! May every bite bring you joy. 🍴",
    "Hope you savor every flavor! Enjoy your meal! 🍽️",
    "Wishing you a fantastic dining experience! 🍷🍽️",
    "May your meal be filled with laughter and good conversations! 🍲😊",
    "Sending you best wishes for a tasty meal! 🥗",
    "Enjoy your feast! 🍖🍗",
    "May your meal be a delicious delight! 🍽️🎉",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function workSentences() {
  const sentences = [
    "Thank you for your dedication and hard work! 🙏",
    "Your hard work hasn't gone unnoticed. Thank you! 🌟",
    "We appreciate your tireless efforts. Thank you for your hard work! 💼",
    "Your commitment to excellence is truly commendable. Thank you! 👏",
    "Thank you for going above and beyond with your hard work! 🚀",
    "Your hard work and dedication make all the difference. Thank you! 🌟",
    "Your diligence and perseverance are valued. Thank you for your hard work! 💪",
    "Thank you for putting in the extra effort. Your hard work is appreciated! 👍",
    "Your hard work is noticed and deeply appreciated. Thank you! 🌟"
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const { addTask } = useContext(TasksContext);

  const onChange = (e) => {
    setTask(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.length < 5) {
      toast.error("Task should be at least 5 characters" + randomEmoji(), {
        transition: Bounce,
      });
      return;
    }

    const taskKeywords = {
      reading: ["read", "قراءة", "book"],
      meditating: ["meditate", "تامل", "تأمل", "تنفس"],
      praying: ["صلاة", "pray", "صلي"],
      learning: ["learn", "study", "تعلم", "محاضره", "محاضرة"],
      gratitude: ["يمان", "yaman", "yman", "Yman", "Yaman"],
      writing: ["كتابة", "write", "Write", "أكتب", "اكتب"],
      family: [
        "شموخ",
        "نوف",
        "امي",
        "دودي",
        " الما",
        "شهومي",
        "نواف",
        "معن",
        "ثائر",
      ],
      work: ["جلي", "تكنيس", "مساعدة", "طبخ", "شغل", "ترتيب", "تنطيف"],
      meal: ["عشاء", "طعام", "اكل", "شوربة", "تناول", "فطور", "غداء"],
    };

    const showToast = (sentence) => {
      toast.success(sentence, { transition: Bounce });
    };

    const checkTask = (task, keywords) => {
      return keywords.some((word) => task.includes(word));
    };

    const handleTask = (task) => {
      for (const [taskName, keywords] of Object.entries(taskKeywords)) {
        if (checkTask(task, keywords)) {
          showToast(getSentenceForTask(taskName));
          return;
        }
      }
    };

    const getSentenceForTask = (taskName) => {
      switch (taskName) {
        case "reading":
          return readingSentence();
        case "writing":
          return writingSentences();
        case "meditating":
          return meditationSentence();
        case "praying":
          return prayerSentences();
        case "learning":
          return learningSentences();
        case "gratitude":
          return gratitudeSentences();
        case "family":
          return familySentences();
        case "meal":
          return mealSentences();
        case "work":
          return workSentences();
        default:
          return "";
      }
    };

    handleTask(task);

    addTask(task);
    setTask("");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="Task" className="form-label">
          Add a new task.
        </label>
        <input
          type="text"
          className="form-control"
          id="Task"
          aria-describedby="newTask"
          placeholder="ex  water the planet... "
          value={task}
          onChange={onChange}
        />
        <div id="newTask" className="form-text"></div>
      </div>
      <button type="submit" className="btn btn-primary">
        add
      </button>
    </form>
  );
};

export default AddTaskForm;
