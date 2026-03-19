import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 预置单词数据（与前端 wordsData 保持一致）
const wordsData = [
  // Day 1
  { id: 'w1', word: 'abandon', meaning: 'v. 放弃，抛弃；n. 放纵', pronunciation: '', example: 'He had to abandon his car in the snow. 他不得不在雪中放弃他的汽车。', level: 'medium', day: 1 },
  { id: 'w2', word: 'abnormal', meaning: 'adj. 反常的，不规则的', pronunciation: '', example: 'The test results showed some abnormal values. 测试结果显示了一些异常值。', level: 'medium', day: 1 },
  { id: 'w3', word: 'abolish', meaning: 'v. 废除，取消', pronunciation: '', example: 'The government decided to abolish the death penalty. 政府决定废除死刑。', level: 'medium', day: 1 },
  { id: 'w4', word: 'abrupt', meaning: 'adj. 突然的，陡峭的', pronunciation: '', example: 'The road came to an abrupt end. 道路突然终止了。', level: 'medium', day: 1 },
  { id: 'w5', word: 'absurd', meaning: 'adj. 荒谬的，可笑的', pronunciation: '', example: 'It\'s absurd to believe that the earth is flat. 相信地球是平的是荒谬的。', level: 'medium', day: 1 },
  { id: 'w6', word: 'abundance', meaning: 'n. 丰富，充裕', pronunciation: '', example: 'The region has an abundance of natural resources. 该地区拥有丰富的自然资源。', level: 'medium', day: 1 },
  { id: 'w7', word: 'accessory', meaning: 'n. 附件，同谋；adj. 辅助的', pronunciation: '', example: 'The car came with several accessories. 这辆车配有几个附件。', level: 'medium', day: 1 },
  { id: 'w8', word: 'accommodate', meaning: 'v. 容纳，供应，调节', pronunciation: '', example: 'The hotel can accommodate up to 500 guests. 这家酒店可容纳多达500位客人。', level: 'medium', day: 1 },
  { id: 'w9', word: 'acquaint', meaning: 'v. 使熟悉，使认识', pronunciation: '', example: 'Let me acquaint you with the new procedures. 让我使你熟悉新程序。', level: 'medium', day: 1 },
  { id: 'w10', word: 'activate', meaning: 'v. 刺激，使活动', pronunciation: '', example: 'Press the button to activate the alarm. 按按钮激活警报。', level: 'medium', day: 1 },
  
  // Day 2
  { id: 'w11', word: 'adverse', meaning: 'adj. 不利的，敌对的', pronunciation: '', example: 'The project faced adverse weather conditions. 该项目面临不利的天气条件。', level: 'medium', day: 2 },
  { id: 'w12', word: 'advocate', meaning: 'v. 提倡，鼓吹；n. 提倡者', pronunciation: '', example: 'She advocates for environmental protection. 她提倡环境保护。', level: 'medium', day: 2 },
  { id: 'w13', word: 'aesthetic', meaning: 'adj. 审美的，美学的', pronunciation: '', example: 'The building has great aesthetic value. 这座建筑具有很高的美学价值。', level: 'medium', day: 2 },
  { id: 'w14', word: 'affiliate', meaning: 'v. 使隶属；n. 分公司', pronunciation: '', example: 'The company decided to affiliate with a larger organization. 该公司决定加入一个更大的组织。', level: 'medium', day: 2 },
  { id: 'w15', word: 'affirm', meaning: 'v. 断言，批准', pronunciation: '', example: 'The witness affirmed that he saw the crime. 证人确认他看到了犯罪。', level: 'medium', day: 2 },
  { id: 'w16', word: 'aggravate', meaning: 'v. 加重，恶化', pronunciation: '', example: 'The lack of rain aggravated the drought. 缺乏雨水加剧了干旱。', level: 'medium', day: 2 },
  { id: 'w17', word: 'aggregate', meaning: 'v. 集合；n. 总数', pronunciation: '', example: 'The aggregate cost of the project was $1 million. 该项目的总成本为100万美元。', level: 'medium', day: 2 },
  { id: 'w18', word: 'agitate', meaning: 'v. 煽动，搅动', pronunciation: '', example: 'The protesters agitated for political reform. 抗议者鼓动政治改革。', level: 'medium', day: 2 },
  { id: 'w19', word: 'allege', meaning: 'v. 宣称，断言', pronunciation: '', example: 'The police allege that he committed the crime. 警方声称他犯了罪。', level: 'medium', day: 2 },
  { id: 'w20', word: 'allocate', meaning: 'v. 分派，分配', pronunciation: '', example: 'The government allocated funds for education. 政府为教育分配了资金。', level: 'medium', day: 2 },
  
  // Day 3
  { id: 'w21', word: 'alter', meaning: 'v. 改变，修改', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w22', word: 'alternate', meaning: 'v. 交替；adj. 交替的', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w23', word: 'ambiguous', meaning: 'adj. 模棱两可的，模糊的', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w24', word: 'amend', meaning: 'v. 修正，改善', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w25', word: 'amplify', meaning: 'v. 扩大，详述', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w26', word: 'analogy', meaning: 'n. 类比，类似', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w27', word: 'analyst', meaning: 'n. 分析家，化验员', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w28', word: 'anniversary', meaning: 'n. 周年纪念日', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w29', word: 'anonymous', meaning: 'adj. 匿名的，无名的', pronunciation: '', example: '', level: 'medium', day: 3 },
  { id: 'w30', word: 'anticipate', meaning: 'v. 预期，占先', pronunciation: '', example: '', level: 'medium', day: 3 },
  
  // Day 4
  { id: 'w31', word: 'apparent', meaning: 'adj. 显然的，外观上的', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w32', word: 'appetite', meaning: 'n. 食欲，爱好', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w33', word: 'applaud', meaning: 'v. 鼓掌，称赞', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w34', word: 'appraisal', meaning: 'n. 评价，估价', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w35', word: 'appreciate', meaning: 'v. 欣赏，领会', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w36', word: 'arbitrary', meaning: 'adj. 随意的，专断的', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w37', word: 'array', meaning: 'v. 布置；n. 陈列', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w38', word: 'articulate', meaning: 'adj. 发音清晰的；v. 清楚地表达', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w39', word: 'ascend', meaning: 'v. 上升，攀登', pronunciation: '', example: '', level: 'medium', day: 4 },
  { id: 'w40', word: 'ascertain', meaning: 'v. 确定，查明', pronunciation: '', example: '', level: 'medium', day: 4 },
  
  // Day 5
  { id: 'w41', word: 'ascribe', meaning: 'v. 归因于，归咎于', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w42', word: 'assault', meaning: 'v. 袭击；n. 攻击', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w43', word: 'assert', meaning: 'v. 断言，宣称', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w44', word: 'assess', meaning: 'v. 估价，评定', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w45', word: 'asset', meaning: 'n. 资产，有价值的人或物', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w46', word: 'assimilate', meaning: 'v. 同化，吸收', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w47', word: 'assurance', meaning: 'n. 保证，确信', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w48', word: 'attain', meaning: 'v. 达到，获得', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w49', word: 'attribute', meaning: 'v. 归因于；n. 属性', pronunciation: '', example: '', level: 'medium', day: 5 },
  { id: 'w50', word: 'authentic', meaning: 'adj. 真实的，可靠的', pronunciation: '', example: '', level: 'medium', day: 5 },
];

// 预置成就数据
const achievementsData = [
  { title: '初次相遇', description: '完成序幕', icon: '👋', conditionType: 'prologue', conditionValue: 1 },
  { title: '第一天', description: '完成第1天的学习', icon: '☀️', conditionType: 'days', conditionValue: 1 },
  { title: '一周坚持', description: '完成第7天的学习', icon: '📅', conditionType: 'days', conditionValue: 7 },
  { title: '单词收藏家', description: '学习50个单词', icon: '📚', conditionType: 'words', conditionValue: 50 },
  { title: '半程英雄', description: '完成第10天的学习', icon: '🏃', conditionType: 'days', conditionValue: 10 },
  { title: '词汇大师', description: '学习100个单词', icon: '🎓', conditionType: 'words', conditionValue: 100 },
  { title: '坚持不懈', description: '连续学习7天', icon: '🔥', conditionType: 'streak', conditionValue: 7 },
  { title: '最终挑战', description: '完成第21天的学习', icon: '👑', conditionType: 'days', conditionValue: 21 },
];

async function main() {
  console.log('开始初始化数据库...');

  // 清空现有数据
  await prisma.reviewSchedule.deleteMany();
  await prisma.wordProgress.deleteMany();
  await prisma.dayProgress.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.word.deleteMany();
  await prisma.achievement.deleteMany();

  console.log('已清空现有数据');

  // 插入单词数据（使用指定的 ID）
  for (const word of wordsData) {
    await prisma.word.create({
      data: {
        id: word.id,
        word: word.word,
        meaning: word.meaning,
        pronunciation: word.pronunciation || null,
        example: word.example || null,
        level: word.level,
        day: word.day,
      },
    });
  }
  console.log(`已插入 ${wordsData.length} 个单词`);

  // 插入成就数据
  for (const achievement of achievementsData) {
    await prisma.achievement.create({
      data: achievement,
    });
  }
  console.log(`已插入 ${achievementsData.length} 个成就`);

  console.log('数据库初始化完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
