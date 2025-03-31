export function randomEmoji() {
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
        "Your hard work is noticed and deeply appreciated. Thank you! 🌟",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function exerciseSentences() {
    const sentences = [
        "Keep pushing! Your body will thank you. 💪",
        "You showed up — that’s what matters. 🏃‍♂️🔥",
        "Every rep counts. You're doing amazing! 🏋️‍♀️",
        "Strong body, strong mind. Keep going! 🧠💪",
        "You're one workout closer to your goals. ✅",
        "Discipline today, results tomorrow. 🕒💥",
        "Crushed it! Your future self is proud. 👏",
        "Stay consistent, progress will follow. 📈",
        "Movement is medicine. Keep it up! 🧘‍♂️",
        "Sweat now, shine later. 🔥",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function breakSentences() {
    const sentences = [
        "You took a break — well deserved! 🛋️",
        "Rest is productive too. Great job. 🌿",
        "Disconnect to reconnect. 📴❤️",
        "Your mind needed that pause. 🧠✨",
        "Step back, breathe, return stronger. 🌬️💪",
        "You recharged — that matters. 🔋💚",
        "Even superheroes need downtime. 🦸‍♀️🦸‍♂️",
        "Space to breathe, space to think. 🌌",
        "Digital detox complete — well done. 📴🌿",
        "Thank you for taking care of your mind. 💖",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function cleaningSentences() {
    const sentences = [
        "Clean space, clear mind. Well done! 🧼🧠",
        "Your environment is grateful. 🧽✨",
        "Organization brings peace. You nailed it! 📦🧘‍♀️",
        "Tidying up is self-care too. 💚",
        "That sparkle? All your doing. 🌟🧼",
        "Your efforts made things better today. 👍",
        "Every small cleanup counts. 👏🧺",
        "You brought order to the chaos. 🔥",
        "You turned a mess into calm. 🧘‍♂️🧹",
        "Thank you for caring for your space. 🌿",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function socialSentences() {
    const sentences = [
        "Reaching out takes courage. Well done. 🤝",
        "You strengthened a connection today. 💬💖",
        "Friendship grows with every word. 🌱",
        "Talking to someone can change everything. 🧠❤️",
        "Your kindness lights up others. ☀️",
        "You made someone’s day better. 😊",
        "Being present is a powerful gift. 🎁",
        "You chose connection over isolation. 💬🌈",
        "You're a light in someone's life today. 💡",
        "You reached out — that matters. 🫂",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function natureSentences() {
    const sentences = [
        "Fresh air and sunshine — healing combo. ☀️🌿",
        "Nature has a way of resetting us. 🍃",
        "You connected with the earth today. 🌍",
        "Peace found in the wind and trees. 🍃🧘‍♀️",
        "Time outdoors is time well spent. 🏞️",
        "You gave your mind room to breathe. 🌬️",
        "You touched grass today — proud of you. 🌱😄",
        "The world is more beautiful with you in it. 🌸",
        "Sunshine suits you. 🌞🌿",
        "Nature embraced you today. 🌳",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function listeningSentences() {
    const sentences = [
        "You opened your ears and mind today. 🎧🧠",
        "Learning through listening — brilliant move. 👂📚",
        "You made time for reflection. 🌙🎧",
        "Stillness and sound — a powerful combo. 🌌",
        "Growth often starts with listening. 🌱👂",
        "You received wisdom today. 🔑🧠",
        "Great minds are good listeners. You're one of them. 🎧",
        "Listening is learning — proud of you. 📖",
        "Your focus is inspiring. 🔥",
        "You tuned in and leveled up. 🎙️⬆️",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function creativeSentences() {
    const sentences = [
        "Your creativity is inspiring! 🎨✨",
        "Keep creating — the world needs your art. 🖌️🌟",
        "Every stroke, every note, every word — it matters. 💫",
        "Express yourself fully — you're doing great. 🧠💡",
        "Art is the journey of a free soul. Keep going. 🌈",
        "What you create adds beauty to the world. 🌍🎨",
        "Your imagination knows no bounds. 🚀🧠",
        "You are a creator. That’s powerful. 💥",
        "Let your art speak louder than words. 🎭🖌️",
        "Every creative act brings joy to others. Keep shining. 🌟",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function memorySentences() {
    const sentences = [
        "You captured a moment — that’s magic. 📸",
        "Memories are the treasures of the heart. 💎",
        "You paused time today. Beautiful. ⏳",
        "Your life is worth documenting. 📝",
        "A picture says more than words. 📷✨",
        "You created a memory to cherish. 🌈",
        "You turned ordinary into unforgettable. 💫",
        "That moment will last forever — thanks to you. 🖼️",
        "Journaling is healing. Keep expressing. 🧠🖊️",
        "You gave today a story. 📖",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function entertainmentSentences() {
    const sentences = [
        "Fun fuels the soul. You earned it. 🎮🔥",
        "Play is productive too. 🎲",
        "A little joy goes a long way. 🎉",
        "You let yourself enjoy the moment. 🌟",
        "Laughter is medicine — keep laughing. 😄",
        "Entertainment = energy restored. ⚡",
        "You made room for fun. 💃",
        "Joy is essential. You chose it. ❤️",
        "Games and giggles? Approved. ✅",
        "Keep that spirit light. ✨",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}


function volunteeringSentences() {
    const sentences = [
        "The world is better because of your kindness. 🌍❤️",
        "Your help made someone’s day. 🙌",
        "Service to others is the rent we pay for living. 💡",
        "You gave from the heart today. 🫶",
        "Helping hands make the world lighter. 👐",
        "You made a difference — never doubt that. ✨",
        "Small acts of kindness are never wasted. 🌱",
        "Generosity suits you. 💖",
        "You were a blessing today. 🌟",
        "Compassion in action — that’s you. 🔥",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function selfCareSentences() {
    const sentences = [
        "You cared for your body today. That’s strength. 💧💪",
        "Self-care is not selfish — it’s survival. 🌿",
        "Hydration achieved. Proud of you. 🚰",
        "Small steps. Big love for yourself. ❤️",
        "You matter — and your actions showed it. 🌟",
        "Your health is your power. 🧠💦",
        "Today, you chose to nurture yourself. 🌼",
        "Drinking water = loving yourself. 🥤",
        "Self-care is a revolution. Keep it up. ✨",
        "Taking care of yourself is a gift to the world. 🎁",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
function planningSentences() {
    const sentences = [
        "Planning brings clarity. You're in control. 🧠📅",
        "Every errand is progress. ✅",
        "You organized your life — respect. 💼",
        "You're building tomorrow today. 🔮",
        "Great prep = less stress. 🔧",
        "Running errands = crushing real life. 🛍️",
        "You cleared your to-do list. 👏",
        "Planning is self-respect in action. 🌟",
        "Prepared and powerful — that’s you. 💪",
        "You made the day smoother. 🔄",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}
export const taskKeywords = {
    reading: [
        "read", "reading", "قراءة", "book", "books", "novel", "article", "magazine",
        "story", "قصص", "رواية", "كتب", "مقال", "قصة", "literature"
    ],
    meditating: [
        "meditate", "meditating", "تأمل", "تنفس", "breathing", "healing", "relaxation",
        "yoga", "calm", "peace", "silence", "mindfulness", "جلسة", "راحة", "هدوء",
        "استرخاء", "تأمل", "صفاء", "وعي"
    ],
    praying: [
        "pray", "prayer", "صلاة", "صلي", "دعاء", "اذكار", "ركعة", "ركعات", "استغفار",
        "تسبيح", "تحميد", "صيام", "صليت", "قرآن", "quran", "fasting"
    ],
    learning: [
        "learn", "learning", "study", "studying", "تعلم", "دورة", "course", "lecture",
        "محاضرة", "كورس", "درس", "مذاكرة", "تعليمي", "فهم", "استيعاب", "تحضير",
        "revision", "homework", "assignment", "quiz", "امتحان"
    ],
    gratitude: [
        "يمان", "yaman", "yman", "Yman", "Yaman", "gratitude", "grateful", "thankful",
        "thanks", "امتنان", "شكرا", "شكر", "عرفان", "امتن", "blessed", "الحمدلله"
    ],
    writing: [
        "write", "writing", "written", "كتابة", "أكتب", "اكتب", "مقالة", "note",
        "notes", "diary", "journal", "تدوين", "دفتر", "مذكرة", "نص", "سرد", "رسالة"
    ],
    family: [
        ...("عمر حمزة سرى حنين ابي امي ماما بابا اخي اختي زوجي زوجتي ابن بنت عائلة اهل اولاد بنتي ابني أختي أخي زوج أمي زوجة أبي خال عم خالة عمة".split(" ")),
        "family", "dad", "mom", "father", "mother", "brother", "sister", "wife", "husband",
        "son", "daughter", "parents", "kids", "relatives", "cousin", "uncle", "aunt", "grandma", "grandpa"
    ],
    work: [
        "جلي", "تكنيس", "مساعدة", "طبخ", "شغل", "ترتيب", "تنطيف", "عمل", "دوام",
        "مكتب", "مهام", "تسليم", "مشروع", "مقابلة", "زوم", "وظيفة", "شغلي",
        "work", "job", "office", "meeting", "project", "deadline", "task", "tasks",
        "meeting", "assignment", "business", "freelance", "client"
    ],
    meal: [
        "عشاء", "غداء", "فطور", "سحور", "افطار", "اكل", "وجبة", "شوربة", "طعام",
        "تناول", "snack", "meal", "dinner", "lunch", "breakfast", "food", "eat",
        "eating", "soup", "sandwich", "drink", "juice"
    ],
    exercise: [
        "exercise", "workout", "رياضة", "تمرين", "تمارين", "مشيت", "ركض", "جري", "نط",
        "جيم", "نادي", "fitness", "gym", "train", "training", "run", "walk", "lift",
        "squats", "pushups", "cardio", "yoga"
    ],
    creative: [
        "draw", "painting", "sketch", "رسم", "لوحة", "تلوين", "تصميم", "art", "فن",
        "create", "illustration", "creativity", "graphic", "design", "craft", "handmade"
    ],
    break: [
        "break", "راحة", "استراحة", "فصل", "نوم", "راحة نفسية", "detox", "disconnect",
        "off", "shutdown", "reset", "breathe", "pause", "relax"
    ],
    cleaning: [
        "clean", "organize", "wash", "ترتيب", "تنظيف", "جلي", "مسح", "كنس", "غسيل",
        "ترويق", "vacuum", "tidy", "laundry", "declutter", "sanitize", "sweep", "wipe"
    ],
    social: [
        "message", "call", "talk", "chat", "visit", "connect", "تواصل", "مكالمة",
        "رسالة", "جلسة", "لقاء", "محادثة", "زرت", "شوفت", "شفت", "جروب", "جماعة"
    ],
    nature: [
        "park", "walk", "outdoor", "sun", "nature", "breath", "fresh air", "حديقة",
        "شمس", "هواء", "الخارج", "نبات", "زرع", "أشجار", "زهور", "غابة", "شاطئ", "جبال"
    ],
    listening: [
        "listen", "podcast", "audiobook", "استماع", "بودكاست", "سمعت", "محاضرة صوتية",
        "قرآن", "voice", "hearing", "تسجيل", "صوت", "recitation", "reflection", "تدبر"
    ],
    volunteering: [
        "ساعدت", "تبرع", "مساعدة", "volunteer", "donate", "help", "support", "خير", "عمل خيري",
        "charity", "giving", "aid", "مبادرة", "إغاثة", "خدمة", "community", "relief", "assistance"
    ],
    selfCare: [
        "water", "hydration", "شرب", "ماء", "راحة", "نوم", "استرخاء", "self-care",
        "care", "health", "راحة", "استجمام", "رعاية", "عناية", "wellness", "spa"
    ],
    memories: [
        "صورة", "ذكريات", "picture", "photo", "photography", "journal", "توثيق",
        "تدوين", "تصوير", "memory", "capture", "لقطة", "ذكرى", "دفتر", "حدث", "قصة",
        "حدث مهم", "مشهد", "document"
    ],
    entertainment: [
        "game", "play", "game", "لعبة", "لعب", "تسلية", "netflix", "مشاهدة",
        "fun", "تفرجت", "يوتيوب", "movie", "tv", "entertainment", "مسلسل", "فيلم",
        "سهر", "stream", "binge", "gaming"
    ],
    planning: [
        "plan", "errand", "grocery", "list", "تحضير", "إعداد", "ترتيب", "شراء",
        "قائمة", "خطة", "مخطط", "جدول", "مواعيد", "schedule", "prep", "planning",
        "to-do", "مهمة", "سوبرماركت", "مهام"
    ],
};
export const getSentenceForTask = (taskName: string) => {
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
        case "exercise":
            return exerciseSentences();
        case "creative":
            return creativeSentences();
        case "break":
            return breakSentences();
        case "cleaning":
            return cleaningSentences();
        case "social":
            return socialSentences();
        case "nature":
            return natureSentences();
        case "listening":
            return listeningSentences();
        case "volunteering":
            return volunteeringSentences();
        case "selfCare":
            return selfCareSentences();
        case "memories":
            return memorySentences();
        case "entertainment":
            return entertainmentSentences();
        case "planning":
            return planningSentences();
        default:
            return "";
    }
};