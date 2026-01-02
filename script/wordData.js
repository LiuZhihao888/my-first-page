// 词库管理模块（单例模式，避免全局污染）
const wordData = (() => {
  // 词库数据直接嵌入（支持本地文件打开）
  let allWords = [
    {
      "word": "abandon",
      "phonetic": "/əˈbændən/",
      "definitions": [
        {
          "partOfSpeech": "v.",
          "meanings": ["放弃，抛弃", "遗弃，丢弃", "停止，中断"]
        },
        {
          "partOfSpeech": "n.",
          "meanings": ["放任，放纵", "任性，狂热"]
        }
      ],
      "forms": ["abandons(n.)", "abandoned(v.)", "abandoning(v.)", "abandonment(n.)"],
      "collocations": ["abandon oneself to沉溺于", "abandon hope绝望", "abandon a ship弃船"],
      "example": "He abandoned his family and went away with all their money.他抛弃了家人，带着他们所有的钱走了。",
      "examTips": "高频词汇，常考动词含义"
    },
    {
      "word": "ability",
      "phonetic": "/əˈbɪləti/",
      "definitions": [
        {
          "partOfSpeech": "n.",
          "meanings": ["能力，才能", "（体力、智力）能耐，本领", "技能，本事"]
        }
      ],
      "forms": ["abilities(n.)"],
      "collocations": ["have the ability to do sth.有能力做某事", "beyond one's ability超出某人的能力范围"],
      "example": "The ability to communicate effectively is a crucial skill in business.有效沟通的能力是商业中的关键技能。",
      "examTips": "core ability 核心能力，job ability工作能力"
    },
    {
      "word": "anchor",
      "phonetic": "/ˈæŋkə(r)/",
      "definitions": [
        {
          "partOfSpeech": "n.",
          "meanings": ["锚", "支柱，依靠", "主持人，主播"]
        },
        {
          "partOfSpeech": "v.",
          "meanings": ["抛锚，使稳固", "使固定", "主持节目"]
        }
      ],
      "forms": ["anchored(v.)", "anchoring(v.)", "anchors(n.)"],
      "collocations": ["drop anchor抛锚", "weigh anchor起锚", "an anchor in the storm风暴中的锚（精神支柱）"],
      "example": "In times of crisis, people tend to look for an anchor to hold onto.在危机时刻，人们往往会寻找可以依靠的支柱。",
      "examTips": "具体名词引申为抽象含义"
    },
    {
      "word": "abbreviation",
      "phonetic": "/əˌbrɪviˈeɪʃn/",
      "definitions": [
        {
          "partOfSpeech": "n.",
          "meanings": ["缩写，缩写词", "缩短，节略", "缩略形式"]
        }
      ],
      "forms": ["abbreviations(n.)"],
      "collocations": ["common abbreviation常用缩写", "make an abbreviation缩写"],
      "example": "The abbreviation for United States of America is USA.美利坚合众国的缩写是USA。",
      "examTips": "语言学术语，注意发音和拼写"
    },
    {
      "word": "division",
      "phonetic": "/dɪˈvɪʒn/",
      "definitions": [
        {
          "partOfSpeech": "n.",
          "meanings": ["分割，划分", "部门，科", "除法（数学运算）", "分歧，分裂"]
        }
      ],
      "forms": ["divisions(n.)"],
      "collocations": ["division of labor分工", "division of power分权", "division line分界线"],
      "example": "The company restructured its operations with the division into separate departments.公司通过划分为独立部门来重组运营。",
      "examTips": "多义词，不同语境含义差异大"
    },
    {
      "word": "horizontal",
      "phonetic": "/ˌhɒrɪˈzɒntl/",
      "definitions": [
        {
          "partOfSpeech": "adj.",
          "meanings": ["水平的，横的", "平的，平坦的"]
        },
        {
          "partOfSpeech": "n.",
          "meanings": ["水平线，水平面", "水平方向"]
        }
      ],
      "forms": ["horizontally(adv.)"],
      "collocations": ["horizontal axis横轴", "horizontal surface水平面", "horizontal integration横向整合"],
      "example": "The picture should be hung so that its horizontal line is level with your eye.挂画时应使其水平线与你的眼睛齐平。",
      "examTips": "空间方位词，反义词vertical"
    },
    {
      "word": "align",
      "phonetic": "/əˈlaɪn/",
      "definitions": [
        {
          "partOfSpeech": "v.",
          "meanings": ["排列，对齐", "调整，校准", "结盟，支持", "使一致，使结盟"]
        }
      ],
      "forms": ["aligned(v.)", "aligning(v.)", "alignment(n.)"],
      "collocations": ["align with与…对齐", "align oneself with sb.与某人结盟", "align the text对齐文本"],
      "example": "The government aligned itself with the environmental groups on the new policy.政府在新政策上与环保组织保持一致。",
      "examTips": "多义动词，不同语境含义丰富"
    },
    {
      "word": "margin",
      "phonetic": "/ˈmɑːdʒɪn/",
      "definitions": [
        {
          "partOfSpeech": "n.",
          "meanings": ["页边空白，边缘", "利润，盈余", "幅度，差额"]
        },
        {
          "partOfSpeech": "v.",
          "meanings": ["留边，加边于"]
        }
      ],
      "forms": ["margins(n.)"],
      "collocations": ["on the margin of在…的边缘", "profit margin利润率", "margin of error误差范围"],
      "example": "The candidate won by a narrow margin.候选人以微弱优势获胜。",
      "examTips": "多义词，经济类语境常考"
    }
  ];
  
  const PAGE_SIZE = 100; // 每页100词

  // 初始化词库（替代原来的异步加载）
  const loadWordList = async () => {
    console.log(`词库加载成功：共${allWords.length}个单词`);
    return allWords;
  };

  // 获取总页数
  const getTotalPages = () => Math.ceil(allWords.length / PAGE_SIZE);

  // 获取指定页码的单词（页码从1开始）
  const getWordsByPage = (pageNum) => {
    const start = (pageNum - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return allWords.slice(start, end);
  };

  // 获取总单词数
  const getTotalWords = () => allWords.length;

  // 更新词库数据的方法
  const updateWordList = (newWords) => {
    allWords = newWords;
  };

  return { loadWordList, getTotalPages, getWordsByPage, getTotalWords, updateWordList };
})();