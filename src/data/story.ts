import type { StoryScene, DialogueLine } from '@/types';

export const prologueDialogues: DialogueLine[] = [
  {
    id: 'p1',
    speaker: 'narrator',
    text: '【航行员日志】今天是航行第247天。一切正常。目标：寻找适合人类殖民的类地星球。地球资源正在枯竭，我们需要新的家园。',
  },
  {
    id: 'p2',
    speaker: 'narrator',
    text: '祖父曾来过这个扇区。但他从不告诉我具体经历了什么。他说："如果有一天你也去了那里，会明白为什么我从不谈论它。"',
  },
  {
    id: 'p3',
    speaker: 'narrator',
    text: '【系统警告】⚠️ 检测到未知能量波动 ⚠️ 引力异常 ⚠️ 传感器离线',
  },
  {
    id: 'p4',
    speaker: 'narrator',
    text: '【AI助手】"未知引力源正在捕获飞船。无法摆脱。预计30秒后进入重力井。燃料储备...异常消耗。我们被某种东西正在吸取能量。"',
  },
  {
    id: 'p5',
    speaker: 'narrator',
    text: '【画面】紫色漩涡出现，飞船被卷入，仪表盘全部变红，意识逐渐模糊...',
  },
  {
    id: 'p6',
    speaker: 'narrator',
    text: '（透过破碎舷窗看到紫色天空）（发光的小实体在移动）（失去意识）',
  },
  {
    id: 'p7',
    speaker: 'lexicon',
    text: '你好，年轻的探险家。恭喜你在单词星成功迫降。虽然"成功"这个词...可能需要重新定义。',
    emotion: '😊',
  },
  {
    id: 'p8',
    speaker: 'lexicon',
    text: '欢迎来到单词星。宇宙中最后一个词汇庇护所。这些小家伙...他们就是单词居民。',
    emotion: '✨',
  },
  {
    id: 'p9',
    speaker: 'user',
    text: '这些...他们有意识吗？',
  },
  {
    id: 'p10',
    speaker: 'lexicon',
    text: '哦，非常有！每个单词都是一段被遗忘的记忆，一段等待被重述的故事。而你...很幸运地成为了第5位在过去的100年里迫降于此的探险家。',
    emotion: '📊',
  },
  {
    id: 'p11',
    speaker: 'lexicon',
    text: '你的飞船需要重新充能。我有能量。但我需要你帮我做一些小任务。每天，认识至少10个单词居民。坚持21天，收集210个单词的认知能量。我就为你提供返航的燃料。很简单，对吧？',
    emotion: '🤔',
  },
];

export const day1MorningDialogues: DialogueLine[] = [
  {
    id: 'd1m1',
    speaker: 'lexicon',
    text: '欢迎来到第1天！（屏幕显示：📚）今天的目标：认识10个新朋友。',
    emotion: '😊',
  },
  {
    id: 'd1m2',
    speaker: 'user',
    text: '这些单词...他们有意识吗？',
  },
  {
    id: 'd1m3',
    speaker: 'lexicon',
    text: '哦，非常有！每个单词都是一段被遗忘的记忆，一段等待被重述的故事。（指向一个单词居民）比如这位...ABANDON（抛弃）。他已经800年没被任何人记住了。你愿意成为第一个吗？',
    emotion: '💔',
  },
];

export const day1EveningDialogues: DialogueLine[] = [
  {
    id: 'd1e1',
    speaker: 'lexicon',
    text: '想听听这颗星球的故事吗？',
    emotion: '🌙',
  },
  {
    id: 'd1e2',
    speaker: 'user',
    text: '当然。',
  },
  {
    id: 'd1e3',
    speaker: 'lexicon',
    text: '很久以前，宇宙中有一个种族叫"记忆族"。他们发明了"词汇具象化"技术。每个单词，都变成有生命的存在。我是他们的图书馆管理员。每天给这些单词讲故事，教它们理解宇宙的意义。',
    emotion: '✨',
  },
  {
    id: 'd1e4',
    speaker: 'lexicon',
    text: '（停顿）但后来，"大遗忘"发生了。所有文明都失去了语言能力。记忆族为了让词汇存活，将他们发射到宇宙深处。我自告奋勇，担任守护者。我的身体被改造成半机械体，可以存活千年...',
    emotion: '💔',
  },
  {
    id: 'd1e5',
    speaker: 'lexicon',
    text: '当我返回时，记忆族已经消失了。整个种族...一个不剩。只剩下我，和这些单词。800年了。（屏幕显示星星）你是第5位访客。前4位都完成了任务，离开了。但你...',
    emotion: '🌙',
  },
  {
    id: 'd1e6',
    speaker: 'lexicon',
    text: '好了，太晚了。明天见，年轻的探险家。（屏幕显示：🌙）',
    emotion: '😊',
  },
];

export const day2MorningDialogues: DialogueLine[] = [
  {
    id: 'd2m1',
    speaker: 'lexicon',
    text: '早上好！第2天开始了。（屏幕显示：📚）今天的目标：再认识10个新朋友。',
    emotion: '😊',
  },
  {
    id: 'd2m2',
    speaker: 'user',
    text: 'Lexicon，我很好奇...这颗星球上还有其他生物吗？',
  },
  {
    id: 'd2m3',
    speaker: 'lexicon',
    text: '（思考）除了单词居民...偶尔会有一些"词汇幽灵"出现。它们是那些被遗忘太久的单词，失去了实体，只能在夜空中飘荡。有时候，它们会试图和访客说话...',
    emotion: '👻',
  },
  {
    id: 'd2m4',
    speaker: 'user',
    text: '它们危险吗？',
  },
  {
    id: 'd2m5',
    speaker: 'lexicon',
    text: '不，它们只是...孤独。它们渴望被记住，被使用。如果你在夜晚看到发光的文字，那就是它们在打招呼。不要害怕，它们不会伤害你。',
    emotion: '💙',
  },
];

export const day2EveningDialogues: DialogueLine[] = [
  {
    id: 'd2e1',
    speaker: 'lexicon',
    text: '今天的学习很顺利！你现在已经认识了20个单词居民了。（屏幕显示：📊）',
    emotion: '😊',
  },
  {
    id: 'd2e2',
    speaker: 'user',
    text: 'Lexicon，你在这里一个人待了800年...你不寂寞吗？',
  },
  {
    id: 'd2e3',
    speaker: 'lexicon',
    text: '（沉默片刻）寂寞...（微笑）这个词，在单词星上有很多层含义。有时候，它是孤独。但更多时候，它是一种宁静。单词居民们很吵闹，它们每天都在争论自己的定义...',
    emotion: '🤔',
  },
  {
    id: 'd2e4',
    speaker: 'lexicon',
    text: '而且，每100年，像你这样的访客就会到来。你们带来了新的故事，新的记忆。这些记忆会滋养单词居民，让它们变得更强大。所以，我并不真正寂寞。',
    emotion: '✨',
  },
  {
    id: 'd2e5',
    speaker: 'lexicon',
    text: '（看向远方）但有时候，在深夜...我会想起记忆族。想起他们教我的第一句话："词汇是文明的血液"。（屏幕显示：💔）',
    emotion: '💔',
  },
  {
    id: 'd2e6',
    speaker: 'lexicon',
    text: '好了，休息吧。明天，我会告诉你更多关于单词居民的秘密。晚安，年轻的探险家。（屏幕显示：🌙）',
    emotion: '😊',
  },
];

export const day3MorningDialogues: DialogueLine[] = [
  {
    id: 'd3m1',
    speaker: 'lexicon',
    text: '第3天开始了！（屏幕显示：⚠️）但我必须警告你：今天会有一个...特殊的单词。',
    emotion: '😊',
  },
  {
    id: 'd3m2',
    speaker: 'user',
    text: '特殊？',
  },
  {
    id: 'd3m3',
    speaker: 'lexicon',
    text: 'HOPE（希望）。她是最古老的单词之一。也是最挑剔的。她只"选择"她认为值得的人。',
    emotion: '✨',
  },
  {
    id: 'd3m4',
    speaker: 'lexicon',
    text: '（屏幕显示：❓）她不显示单词，而是先显示一个问号。你必须证明...你真的需要希望。',
    emotion: '🤔',
  },
];

export const day3EveningDialogues: DialogueLine[] = [
  {
    id: 'd3e1',
    speaker: 'lexicon',
    text: '（看起来很悲伤）HOPE选择了你。',
    emotion: '💔',
  },
  {
    id: 'd3e2',
    speaker: 'user',
    text: '只有3个？',
  },
  {
    id: 'd3e3',
    speaker: 'lexicon',
    text: '包括你。第1个是...我自己。（停顿）第2个是你的祖父，50年前。第3个，是你。',
    emotion: '😰',
  },
  {
    id: 'd3e4',
    speaker: 'user',
    text: '什么？！我的祖父来过这里？',
  },
  {
    id: 'd3e5',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我...我不该说的。忘了我刚才说的话吧。',
    emotion: '😰',
  },
  {
    id: 'd3e6',
    speaker: 'user',
    text: '不，告诉我！我祖父发生了什么？',
  },
  {
    id: 'd3e7',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）他...他完成了208个单词。只差2个就完成了。',
    emotion: '💔',
  },
  {
    id: 'd3e8',
    speaker: 'user',
    text: '然后呢？',
  },
  {
    id: 'd3e9',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）他...不得不选择离开。地球上有家人在等他。飞船的燃料只够单程。',
    emotion: '💔',
  },
  {
    id: 'd3e10',
    speaker: 'lexicon',
    text: '他临走前对HOPE说："我会回来的。我发誓。"（Lexicon转向你）',
    emotion: '💔',
  },
  {
    id: 'd3e11',
    speaker: 'lexicon',
    text: '你祖父50年没回来了。但我...我一直在等。因为HOPE告诉我，他还会派人来。',
    emotion: '💔',
  },
  {
    id: 'd3e12',
    speaker: 'lexicon',
    text: '（屏幕显示：🌟）就是你。',
    emotion: '✨',
  },
];

export const day4MorningDialogues: DialogueLine[] = [
  {
    id: 'd4m1',
    speaker: 'lexicon',
    text: '第4天！你找到了...他的遗留物？（屏幕显示：🌧️）',
    emotion: '🤔',
  },
  {
    id: 'd4m2',
    speaker: 'user',
    text: '你一直知道？',
  },
  {
    id: 'd4m3',
    speaker: 'lexicon',
    text: '（屏幕显示：🌧️）我知道很多事情。但有些事情，必须由你自己发现。开始第4天的学习吧。今天有特殊的单词在等你：MEMORY（记忆）。',
    emotion: '🤔',
  },
];

export const day4EveningDialogues: DialogueLine[] = [
  {
    id: 'd4e1',
    speaker: 'lexicon',
    text: '你今天...好像心不在焉。',
    emotion: '🤔',
  },
  {
    id: 'd4e2',
    speaker: 'user',
    text: '我看到了...一些东西。',
  },
  {
    id: 'd4e3',
    speaker: 'lexicon',
    text: '（屏幕显示：👀）幻象？',
    emotion: '😶',
  },
  {
    id: 'd4e4',
    speaker: 'user',
    text: '我看到了我祖父。',
  },
  {
    id: 'd4e5',
    speaker: 'lexicon',
    text: '（屏幕显示：😶）啊。那是单词的副作用。当你深入记忆某个单词时，可能会...看到那个单词的过去。',
    emotion: '😶',
  },
  {
    id: 'd4e6',
    speaker: 'user',
    text: '所以这些单词...记得我祖父？',
  },
  {
    id: 'd4e7',
    speaker: 'lexicon',
    text: '（屏幕显示：🌧️💔）ABANDON记得。HOPE记得。MEMORY...最记得。因为你的祖父，是唯一一个差点就完成...全部单词的人。',
    emotion: '💔',
  },
];

export const day5MorningDialogues: DialogueLine[] = [
  {
    id: 'd5m1',
    speaker: 'lexicon',
    text: '第5天开始了！（屏幕显示：📊）你现在已经认识了30个单词居民了。',
    emotion: '😊',
  },
  {
    id: 'd5m2',
    speaker: 'lexicon',
    text: '继续学习，继续提问。真相会在第14天揭晓。（屏幕显示：🤫）',
    emotion: '🤫',
  },
];

export const day5EveningDialogues: DialogueLine[] = [
  {
    id: 'd5e1',
    speaker: 'lexicon',
    text: '（第一次卸下防备）',
    emotion: '😶',
  },
  {
    id: 'd5e2',
    speaker: 'user',
    text: 'Lexicon，你在等我祖父回来吗？',
  },
  {
    id: 'd5e3',
    speaker: 'lexicon',
    text: '（沉默很久）...是的。',
    emotion: '😶',
  },
  {
    id: 'd5e4',
    speaker: 'user',
    text: '50年了？',
  },
  {
    id: 'd5e5',
    speaker: 'lexicon',
    text: '（屏幕显示：😢）对我来说，50年和1天...没有区别。我会计算时间的。每21年一个周期。他已经错过了4个周期。',
    emotion: '😢',
  },
  {
    id: 'd5e6',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）有时候我怀疑...他是否还记得这个承诺。',
    emotion: '💔',
  },
  {
    id: 'd5e7',
    speaker: 'lexicon',
    text: '但你来了。这意味...他的记忆还在延续。（屏幕显示：❤️）',
    emotion: '❤️',
  },
  {
    id: 'd5e8',
    speaker: 'lexicon',
    text: '谢谢你...让我知道，我还被记得。',
    emotion: '😊',
  },
];

export const day6MorningDialogues: DialogueLine[] = [
  {
    id: 'd6m1',
    speaker: 'lexicon',
    text: '第6天开始了！（屏幕显示：⚠️）今天...单词星发生了一些异常。',
    emotion: '😰',
  },
  {
    id: 'd6m2',
    speaker: 'user',
    text: '发生了什么？！',
  },
  {
    id: 'd6m3',
    speaker: 'lexicon',
    text: '（努力保持镇定）只是...一点小故障。别担心。开始今天的学习吧。',
    emotion: '😰',
  },
];

export const day6EveningDialogues: DialogueLine[] = [
  {
    id: 'd6e1',
    speaker: 'lexicon',
    text: '（第一次异常）单词星发生轻微震动，天空出现淡淡的紫色裂缝。一些单词变得虚弱。',
    emotion: '😰',
  },
  {
    id: 'd6e2',
    speaker: 'user',
    text: '发生了什么？！',
  },
  {
    id: 'd6e3',
    speaker: 'lexicon',
    text: '（声音第一次颤抖）一个...已经死去的单词。被遗忘的单词。',
    emotion: '😰',
  },
  {
    id: 'd6e4',
    speaker: 'user',
    text: '单词会...死？',
  },
  {
    id: 'd6e5',
    speaker: 'lexicon',
    text: '是的。如果长期不被认知，他们会失去...一切。成为空白。',
    emotion: '😰',
  },
  {
    id: 'd6e6',
    speaker: 'lexicon',
    text: '（天空中的裂缝扩大）我们必须加快速度。从今天开始，每天至少15个单词。否则...来不及了。',
    emotion: '😰',
  },
  {
    id: 'd6e7',
    speaker: 'user',
    text: '否则怎样？！',
  },
  {
    id: 'd6e8',
    speaker: 'lexicon',
    text: '（不回答）',
    emotion: '😰',
  },
];

export const day7MorningDialogues: DialogueLine[] = [
  {
    id: 'd7m1',
    speaker: 'user',
    text: 'Lexicon，告诉我真相。',
    emotion: '😰',
  },
  {
    id: 'd7m2',
    speaker: 'lexicon',
    text: '什么真相？',
    emotion: '🤔',
  },
  {
    id: 'd7m3',
    speaker: 'user',
    text: '单词星在消亡。对吗？',
    emotion: '😰',
  },
  {
    id: 'd7m4',
    speaker: 'lexicon',
    text: '（长时间的沉默）（屏幕显示：...）',
    emotion: '😰',
  },
  {
    id: 'd7m5',
    speaker: 'user',
    text: '21天...不是随意的数字。这是单词星能维持的最后时间。',
    emotion: '😰',
  },
  {
    id: 'd7m6',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）...是的。',
    emotion: '💔',
  },
  {
    id: 'd7m7',
    speaker: 'user',
    text: '如果我完不成210个单词...',
    emotion: '😰',
  },
  {
    id: 'd7m8',
    speaker: 'lexicon',
    text: '所有单词都会死。包括HOPE，包括ABANDON，包括MEMORY。（屏幕显示：😢）包括...那些还记得你的人。',
    emotion: '😢',
  },
  {
    id: 'd7m9',
    speaker: 'user',
    text: '那你呢？',
    emotion: '😰',
  },
  {
    id: 'd7m10',
    speaker: 'lexicon',
    text: '（屏幕显示：❓）我？',
    emotion: '🤔',
  },
  {
    id: 'd7m11',
    speaker: 'user',
    text: '你会怎么样？',
    emotion: '😰',
  },
  {
    id: 'd7m12',
    speaker: 'lexicon',
    text: '（沉默很久）我已经活了800年。也许...是时候休息了。',
    emotion: '😰',
  },
];

export const day7EveningDialogues: DialogueLine[] = [
  {
    id: 'd7e1',
    speaker: 'lexicon',
    text: '我该告诉你全部真相了。',
    emotion: '😰',
  },
  {
    id: 'd7e2',
    speaker: 'lexicon',
    text: '单词星不是自然形成的。它是记忆族最后的遗产。他们用自己的生命能量，创造了这颗星球。为了保护所有的词汇。',
    emotion: '😰',
  },
  {
    id: 'd7e3',
    speaker: 'lexicon',
    text: '而我是...看守者。800年来，我一直在等待。等待一个文明，愿意接受这些"活着的单词"。',
    emotion: '😰',
  },
  {
    id: 'd7e4',
    speaker: 'lexicon',
    text: '但前4次都失败了。每个人都把单词当工具，完成任务后就离开。（屏幕显示：💔）',
    emotion: '💔',
  },
  {
    id: 'd7e5',
    speaker: 'lexicon',
    text: '现在，只剩最后21天。如果210个单词没有被完全认知...星球就会崩溃。而我会...随他们一起消亡。',
    emotion: '😰',
  },
  {
    id: 'd7e6',
    speaker: 'lexicon',
    text: '（屏幕显示：⚡）但现在你知道了真相。你的动机不再是"交易"。（屏幕显示：❤️）',
    emotion: '❤️',
  },
  {
    id: 'd7e7',
    speaker: 'lexicon',
    text: '你是为了...拯救他们。',
    emotion: '❤️',
  },
];

export const day8MorningDialogues: DialogueLine[] = [
  {
    id: 'd8m1',
    speaker: 'lexicon',
    text: '第8天开始了！（屏幕显示：🌙）你昨天晚上...睡得好吗？',
    emotion: '😊',
  },
  {
    id: 'd8m2',
    speaker: 'user',
    text: '我在想我祖父。',
  },
  {
    id: 'd8m3',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）我也是。',
    emotion: '💔',
  },
  {
    id: 'd8m4',
    speaker: 'user',
    text: '他只差2个单词。',
  },
  {
    id: 'd8m5',
    speaker: 'lexicon',
    text: '是的。BELONG（归属）和 FOREVER（永远）。',
    emotion: '💔',
  },
  {
    id: 'd8m6',
    speaker: 'user',
    text: '他为什么没能完成？',
  },
  {
    id: 'd8m7',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）因为他在最后时刻收到了地球的通讯。他的妻子...你的祖母...病危。',
    emotion: '💔',
  },
  {
    id: 'd8m8',
    speaker: 'lexicon',
    text: '他必须选择。留下来完成最后的2个单词，还是回去见她最后一面。',
    emotion: '💔',
  },
  {
    id: 'd8m9',
    speaker: 'lexicon',
    text: '（屏幕显示：😢）他选择了爱。',
    emotion: '😢',
  },
];

export const day8EveningDialogues: DialogueLine[] = [
  {
    id: 'd8e1',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）HOPE理解他。我理解他。所有的单词都理解他。',
    emotion: '💔',
  },
  {
    id: 'd8e2',
    speaker: 'lexicon',
    text: '但他违背了诺言。"我会回来"...（屏幕显示：😢）',
    emotion: '😢',
  },
  {
    id: 'd8e3',
    speaker: 'lexicon',
    text: '...他没有回来。',
    emotion: '💔',
  },
];

export const day9MorningDialogues: DialogueLine[] = [
  {
    id: 'd9m1',
    speaker: 'lexicon',
    text: '第9天开始了！（屏幕显示：⚠️）今天...发生了一些不寻常的事情。',
    emotion: '😰',
  },
  {
    id: 'd9m2',
    speaker: 'user',
    text: '什么？',
  },
  {
    id: 'd9m3',
    speaker: 'lexicon',
    text: '一群单词开始"罢工"。他们拒绝被学习，聚集在一起抗议。领头的...是REBEL（叛逆）。',
    emotion: '😰',
  },
];

export const day9EveningDialogues: DialogueLine[] = [
  {
    id: 'd9e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）Rebel："我们厌倦了被当作工具！学完就丢，这就是人类的做法！"',
    emotion: '😰',
  },
  {
    id: 'd9e2',
    speaker: 'lexicon',
    text: 'Rebel，冷静。',
    emotion: '😰',
  },
  {
    id: 'd9e3',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）Rebel："我不冷静！我们活够了这种"等待被认知"的日子！"',
    emotion: '😰',
  },
];

export const day10MorningDialogues: DialogueLine[] = [
  {
    id: 'd10m1',
    speaker: 'lexicon',
    text: '第10天开始了！（屏幕显示：😰）Rebel带领一群单词离开了。',
    emotion: '😰',
  },
  {
    id: 'd10m2',
    speaker: 'user',
    text: '他们会回来吗？',
  },
  {
    id: 'd10m3',
    speaker: 'lexicon',
    text: '（屏幕显示：🌧️）他们不会回来了。那些单词...选择了自由。',
    emotion: '😰',
  },
  {
    id: 'd10m4',
    speaker: 'user',
    text: '这很糟糕吗？',
  },
  {
    id: 'd10m5',
    speaker: 'lexicon',
    text: '（停顿）也许...他们是对的。被谁记住，真的那么重要吗？也许遗忘...也是一种自由。',
    emotion: '🤔',
  },
  {
    id: 'd10m6',
    speaker: 'lexicon',
    text: '（第一次，Lexicon质疑自己的使命）',
    emotion: '🤔',
  },
];

export const day10EveningDialogues: DialogueLine[] = [
  {
    id: 'd10e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）单词星开始频繁震动。天空中的裂缝越来越大。',
    emotion: '😰',
  },
  {
    id: 'd10e2',
    speaker: 'user',
    text: 'Lexicon...我们还有时间吗？',
  },
  {
    id: 'd10e3',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）我不知道...但我们必须继续。',
    emotion: '💔',
  },
];

export const day11MorningDialogues: DialogueLine[] = [
  {
    id: 'd11m1',
    speaker: 'lexicon',
    text: '第11天开始了！（屏幕显示：😰）Rebel回来了...独自一人。',
    emotion: '😰',
  },
  {
    id: 'd11m2',
    speaker: 'user',
    text: '你回来了。',
  },
  {
    id: 'd11m3',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）其他的单词...他们迷路了。他们被"大遗忘"捕获，变成了空白。',
    emotion: '💔',
  },
  {
    id: 'd11m4',
    speaker: 'lexicon',
    text: '我...我差点也...',
    emotion: '😰',
  },
];

export const day11EveningDialogues: DialogueLine[] = [
  {
    id: 'd11e1',
    speaker: 'lexicon',
    text: 'Rebel："我错了。被遗忘比等待更可怕。至少...在等待中，还有希望。"（屏幕显示：💔）',
    emotion: '💔',
  },
  {
    id: 'd11e2',
    speaker: 'lexicon',
    text: 'Rebel重新加入了学习。其他单词也从阴影中慢慢回来。',
    emotion: '😊',
  },
  {
    id: 'd11e3',
    speaker: 'lexicon',
    text: '（屏幕显示：🤔）800年了，第一次有单词质疑我的使命。',
    emotion: '🤔',
  },
  {
    id: 'd11e4',
    speaker: 'user',
    text: '也许是因为...这次不同。',
  },
  {
    id: 'd11e5',
    speaker: 'lexicon',
    text: '什么不同？（屏幕显示：❓）',
    emotion: '🤔',
  },
  {
    id: 'd11e6',
    speaker: 'user',
    text: '你在看我们的时候，看到的是...生命。',
    emotion: '😊',
  },
  {
    id: 'd11e7',
    speaker: 'lexicon',
    text: '（沉默）（屏幕显示：...）',
    emotion: '🤔',
  },
];

export const day12MorningDialogues: DialogueLine[] = [
  {
    id: 'd12m1',
    speaker: 'lexicon',
    text: '第12天开始了！（屏幕显示：⚠️）能量危机！天空中的裂缝越来越大。单词星开始频繁震动。',
    emotion: '😰',
  },
  {
    id: 'd12m2',
    speaker: 'lexicon',
    text: '我们必须加快节奏。每天至少20个单词。否则来不及。',
    emotion: '😰',
  },
  {
    id: 'd12m3',
    speaker: 'user',
    text: '身体...',
  },
  {
    id: 'd12m4',
    speaker: 'lexicon',
    text: '（屏幕显示：🔋）我没事。只是...能量消耗有点大。',
    emotion: '😰',
  },
];

export const day12EveningDialogues: DialogueLine[] = [
  {
    id: 'd12e1',
    speaker: 'lexicon',
    text: '（你注意到Lexicon的光球开始闪烁，不稳定）',
    emotion: '😰',
  },
  {
    id: 'd12e2',
    speaker: 'user',
    text: 'Lexicon...你还好吗？',
  },
  {
    id: 'd12e3',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我没事。只是...需要休息。',
    emotion: '😰',
  },
];

export const day13MorningDialogues: DialogueLine[] = [
  {
    id: 'd13m1',
    speaker: 'lexicon',
    text: '第13天开始了！（屏幕显示：📊）你现在已经认识了120个单词居民了。',
    emotion: '😊',
  },
  {
    id: 'd13m2',
    speaker: 'lexicon',
    text: '继续努力。还差90个单词。（屏幕显示：🤫）',
    emotion: '🤫',
  },
];

export const day13EveningDialogues: DialogueLine[] = [
  {
    id: 'd13e1',
    speaker: 'lexicon',
    text: '（你发现Lexicon在深夜偷偷"充电"）',
    emotion: '😰',
  },
  {
    id: 'd13e2',
    speaker: 'user',
    text: '你在杀死自己！',
  },
  {
    id: 'd13e3',
    speaker: 'lexicon',
    text: '（屏幕显示：🤫）嘘...单词们不知道。如果他们知道，会自责的。',
    emotion: '🤫',
  },
  {
    id: 'd13e4',
    speaker: 'user',
    text: '为什么要这样做？！',
  },
  {
    id: 'd13e5',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）因为他们是我的家人。而家人...会为彼此牺牲。',
    emotion: '❤️',
  },
];

export const day14MorningDialogues: DialogueLine[] = [
  {
    id: 'd14m1',
    speaker: 'lexicon',
    text: '第14天开始了！（屏幕显示：⏰）明天...就是中点了。',
    emotion: '😊',
  },
  {
    id: 'd14m2',
    speaker: 'user',
    text: '我们完成了140个单词。',
  },
  {
    id: 'd14m3',
    speaker: 'lexicon',
    text: '（屏幕显示：⏰）还差70个。',
    emotion: '😊',
  },
  {
    id: 'd14m4',
    speaker: 'user',
    text: '如果...',
  },
  {
    id: 'd14m5',
    speaker: 'lexicon',
    text: '如果你每天学更多呢？',
    emotion: '😊',
  },
  {
    id: 'd14m6',
    speaker: 'user',
    text: '我愿意！',
  },
  {
    id: 'd14m7',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）你就知道...我会这么说。',
    emotion: '😊',
  },
  {
    id: 'd14m8',
    speaker: 'lexicon',
    text: '（停顿）你知道吗...前4位访客从未主动提出过这样的事。他们只是...完成最低要求。',
    emotion: '🤔',
  },
  {
    id: 'd14m9',
    speaker: 'user',
    text: '我不一样。',
  },
  {
    id: 'd14m10',
    speaker: 'lexicon',
    text: '（屏幕显示：🤔）是的...你不一样。你让我想起了你的祖父。',
    emotion: '🤔',
  },
];

export const day14EveningDialogues: DialogueLine[] = [
  {
    id: 'd14e1',
    speaker: 'lexicon',
    text: '我必须告诉你...结局的真相。',
    emotion: '🤔',
  },
  {
    id: 'd14e2',
    speaker: 'user',
    text: '结局？',
  },
  {
    id: 'd14e3',
    speaker: 'lexicon',
    text: '即使你完成了210个单词，即使单词星被拯救...你仍然需要选择。',
    emotion: '🤔',
  },
  {
    id: 'd14e4',
    speaker: 'lexicon',
    text: '（屏幕显示：🚀 🆚 🌍）选择回到地球，留下我们继续等待下一个访客...',
    emotion: '🤔',
  },
  {
    id: 'd14e5',
    speaker: 'lexicon',
    text: '或者...（屏幕显示：❓）',
    emotion: '🤔',
  },
  {
    id: 'd14e6',
    speaker: 'lexicon',
    text: '或者做出第三种选择。一种800年来从未有人做过的选择。',
    emotion: '🤔',
  },
  {
    id: 'd14e7',
    speaker: 'user',
    text: '什么选择？',
  },
  {
    id: 'd14e8',
    speaker: 'lexicon',
    text: '（屏幕显示：🤐）这个选择...必须由你自己发现。',
    emotion: '🤐',
  },
  {
    id: 'd14e9',
    speaker: 'lexicon',
    text: '第三种选择需要真正的连接。不能是交易心态。必须打破800年的循环。（屏幕显示：🤔）',
    emotion: '🤔',
  },
];

export const day15MorningDialogues: DialogueLine[] = [
  {
    id: 'd15m1',
    speaker: 'lexicon',
    text: '第15天开始了！（屏幕显示：⚠️）重大事件！单词星强烈震动，大片区域开始"空白化"，数十个单词失去意识。',
    emotion: '😰',
  },
  {
    id: 'd15m2',
    speaker: 'lexicon',
    text: '（紧急状态）快！你必须进入核心区！只有完全认知所有剩余单词，才能重启星球核心！',
    emotion: '😰',
  },
  {
    id: 'd15m3',
    speaker: 'user',
    text: '核心区在哪里？！',
  },
  {
    id: 'd15m4',
    speaker: 'lexicon',
    text: '（屏幕显示：🗺️）在星球深处。但那里...很危险。',
    emotion: '😰',
  },
  {
    id: 'd15m5',
    speaker: 'user',
    text: '我不在乎。',
  },
  {
    id: 'd15m6',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）我就知道...你会这么说。',
    emotion: '😊',
  },
];

export const day15EveningDialogues: DialogueLine[] = [
  {
    id: 'd15e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）单词星的震动越来越强烈。天空中的裂缝已经延伸到地平线。',
    emotion: '😰',
  },
  {
    id: 'd15e2',
    speaker: 'user',
    text: '我们还有多少时间？',
  },
  {
    id: 'd15e3',
    speaker: 'lexicon',
    text: '（屏幕显示：⏰）6天。如果6天内不能完成所有单词...单词星就会彻底崩溃。',
    emotion: '😰',
  },
  {
    id: 'd15e4',
    speaker: 'user',
    text: '我们能做到的。',
  },
  {
    id: 'd15e5',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）是的...我相信我们能做到。',
    emotion: '❤️',
  },
];

export const day16MorningDialogues: DialogueLine[] = [
  {
    id: 'd16m1',
    speaker: 'lexicon',
    text: '第16天开始了！（屏幕显示：🗺️）今天，我们进入地下通道。',
    emotion: '😊',
  },
  {
    id: 'd16m2',
    speaker: 'lexicon',
    text: '我们会遇到"被遗忘的单词"——那些已经半空白的单词。他们像幽灵一样游荡。',
    emotion: '😰',
  },
  {
    id: 'd16m3',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）小心...他们可能会试图抓住你。',
    emotion: '😰',
  },
];

export const day16EveningDialogues: DialogueLine[] = [
  {
    id: 'd16e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我们遇到了一个特殊的单词：FORGIVENESS（原谅）。',
    emotion: '😰',
  },
  {
    id: 'd16e2',
    speaker: 'lexicon',
    text: 'Forgiveness："你还记得我吗？我已经3000年没有被记住了。但...我仍然在等待。"（屏幕显示：💔）',
    emotion: '💔',
  },
  {
    id: 'd16e3',
    speaker: 'user',
    text: '我会记住你的。',
  },
  {
    id: 'd16e4',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）Forgiveness的光芒重新亮起。谢谢你...你让我看到了希望。',
    emotion: '😊',
  },
];

export const day17MorningDialogues: DialogueLine[] = [
  {
    id: 'd17m1',
    speaker: 'lexicon',
    text: '第17天开始了！（屏幕显示：⚠️）我们到达了核心区外围。',
    emotion: '😰',
  },
  {
    id: 'd17m2',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我们遭遇了"大遗忘"的具象化——一团紫色迷雾。迷雾试图吞噬你。',
    emotion: '😰',
  },
  {
    id: 'd17m3',
    speaker: 'user',
    text: '那是什么？！',
  },
  {
    id: 'd17m4',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）那是...宇宙中最可怕的东西。它吞噬一切记忆，一切存在。',
    emotion: '😰',
  },
];

export const day17EveningDialogues: DialogueLine[] = [
  {
    id: 'd17e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我们勉强逃脱了。但迷雾正在扩大...',
    emotion: '😰',
  },
  {
    id: 'd17e2',
    speaker: 'user',
    text: '我们还能继续吗？',
  },
  {
    id: 'd17e3',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）必须继续。没有退路了。',
    emotion: '😊',
  },
  {
    id: 'd17e4',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）而且...我看到了一些东西。在迷雾深处，有光。',
    emotion: '❤️',
  },
];

export const day18MorningDialogues: DialogueLine[] = [
  {
    id: 'd18m1',
    speaker: 'lexicon',
    text: '第18天开始了！（屏幕显示：🗺️）我们深入地下，接近核心区。',
    emotion: '😊',
  },
  {
    id: 'd18m2',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）单词星开始剧烈震动。核心区即将崩溃。',
    emotion: '😰',
  },
  {
    id: 'd18m3',
    speaker: 'user',
    text: '我们还有多少单词要学？',
  },
  {
    id: 'd18m4',
    speaker: 'lexicon',
    text: '（屏幕显示：📊）还差30个单词。',
    emotion: '😊',
  },
];

export const day18EveningDialogues: DialogueLine[] = [
  {
    id: 'd18e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我们遇到了一个已经完全空白的单词。它发出无声的尖叫。',
    emotion: '😰',
  },
  {
    id: 'd18e2',
    speaker: 'user',
    text: '我们...能救它吗？',
  },
  {
    id: 'd18e3',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）太晚了。它已经...消失了。',
    emotion: '💔',
  },
  {
    id: 'd18e4',
    speaker: 'lexicon',
    text: '（屏幕显示：😢）这是我们失去的第一个单词。',
    emotion: '😢',
  },
];

export const day19MorningDialogues: DialogueLine[] = [
  {
    id: 'd19m1',
    speaker: 'lexicon',
    text: '第19天开始了！（屏幕显示：⚠️）单词星开始崩溃。大片区域正在消失。',
    emotion: '😰',
  },
  {
    id: 'd19m2',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我们必须加快速度。还差20个单词。',
    emotion: '😰',
  },
  {
    id: 'd19m3',
    speaker: 'user',
    text: 'Lexicon...你的能量...',
  },
  {
    id: 'd19m4',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我没事。只是...有点累了。',
    emotion: '😰',
  },
];

export const day19EveningDialogues: DialogueLine[] = [
  {
    id: 'd19e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）单词星的震动越来越剧烈。天空中的裂缝已经覆盖了半个天空。',
    emotion: '😰',
  },
  {
    id: 'd19e2',
    speaker: 'user',
    text: '我们还有时间吗？',
  },
  {
    id: 'd19e3',
    speaker: 'lexicon',
    text: '（屏幕显示：⏰）2天。最后2天。',
    emotion: '😰',
  },
  {
    id: 'd19e4',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）但我们...我们会成功的。我相信。',
    emotion: '❤️',
  },
];

export const day20MorningDialogues: DialogueLine[] = [
  {
    id: 'd20m1',
    speaker: 'lexicon',
    text: '第20天开始了！（屏幕显示：⚠️）单词星即将崩溃。还差10个单词。',
    emotion: '😰',
  },
  {
    id: 'd20m2',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）我的能量...快耗尽了。',
    emotion: '😰',
  },
  {
    id: 'd20m3',
    speaker: 'user',
    text: 'Lexicon！',
  },
  {
    id: 'd20m4',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）我没事。只是...需要休息一下。',
    emotion: '😊',
  },
];

export const day20EveningDialogues: DialogueLine[] = [
  {
    id: 'd20e1',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）单词星的震动达到了临界点。天空中的裂缝即将闭合。',
    emotion: '😰',
  },
  {
    id: 'd20e2',
    speaker: 'user',
    text: '我们完成了9个单词。还差最后一个。',
  },
  {
    id: 'd20e3',
    speaker: 'lexicon',
    text: '（屏幕显示：😰）最后一个单词...是BELONG（归属）。',
    emotion: '😰',
  },
  {
    id: 'd20e4',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）这是你祖父没能完成的单词。',
    emotion: '💔',
  },
  {
    id: 'd20e5',
    speaker: 'user',
    text: '我会完成的。为了他。也为了你。',
  },
  {
    id: 'd20e6',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）谢谢你...',
    emotion: '❤️',
  },
];

export const day21MorningDialogues: DialogueLine[] = [
  {
    id: 'd21m1',
    speaker: 'lexicon',
    text: '第21天开始了。（屏幕显示：🌟）最后一天。',
    emotion: '😊',
  },
  {
    id: 'd21m2',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）你已经完成了209个单词。还差最后一个：BELONG（归属）。',
    emotion: '😊',
  },
  {
    id: 'd21m3',
    speaker: 'lexicon',
    text: '（屏幕显示：💔）这是你祖父没能完成的单词。也是...决定单词星命运的单词。',
    emotion: '💔',
  },
  {
    id: 'd21m4',
    speaker: 'user',
    text: '我准备好了。',
  },
  {
    id: 'd21m5',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）开始吧。完成这个单词，你就可以做出选择了。',
    emotion: '😊',
  },
];

export const day21EveningDialogues: DialogueLine[] = [
  {
    id: 'd21e1',
    speaker: 'lexicon',
    text: '（屏幕显示：🌟）你完成了所有210个单词。单词星...被拯救了。',
    emotion: '🌟',
  },
  {
    id: 'd21e2',
    speaker: 'user',
    text: '我们成功了！',
  },
  {
    id: 'd21e3',
    speaker: 'lexicon',
    text: '（屏幕显示：😊）是的...我们成功了。单词星重新获得了能量。所有单词都恢复了生机。',
    emotion: '😊',
  },
  {
    id: 'd21e4',
    speaker: 'lexicon',
    text: '（屏幕显示：🤔）现在...是时候做出选择了。',
    emotion: '🤔',
  },
  {
    id: 'd21e5',
    speaker: 'lexicon',
    text: '（屏幕显示：🚀）选择一：回到地球。我会为你提供返航的燃料。你会回到家人身边，继续你的生活。单词星会继续等待下一个访客。',
    emotion: '🤔',
  },
  {
    id: 'd21e6',
    speaker: 'lexicon',
    text: '（屏幕显示：🌍）选择二：留在单词星。成为新的守护者，和我一起保护这些单词。但你会永远失去地球，失去家人。',
    emotion: '🤔',
  },
  {
    id: 'd21e7',
    speaker: 'lexicon',
    text: '（屏幕显示：❓）或者...做出第三种选择。一种800年来从未有人做过的选择。',
    emotion: '🤔',
  },
  {
    id: 'd21e8',
    speaker: 'user',
    text: '第三种选择是什么？',
  },
  {
    id: 'd21e9',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）第三种选择是...打破800年的循环。不是离开，也不是留下。而是...连接。',
    emotion: '❤️',
  },
  {
    id: 'd21e10',
    speaker: 'lexicon',
    text: '（屏幕显示：🌟）你可以回到地球，但不是作为访客。而是作为...单词星的大使。',
    emotion: '🌟',
  },
  {
    id: 'd21e11',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）你会在地球上传播这些单词的故事，让更多人知道单词星的存在。这样，单词星就不再孤独。',
    emotion: '❤️',
  },
  {
    id: 'd21e12',
    speaker: 'lexicon',
    text: '（屏幕显示：🌟）而我会...和你一起回去。单词星会跟随你，成为你的一部分。',
    emotion: '🌟',
  },
  {
    id: 'd21e13',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）这就是第三种选择：不是离开，也不是留下。而是...我们都属于彼此。',
    emotion: '❤️',
  },
  {
    id: 'd21e14',
    speaker: 'user',
    text: '我选择...第三种选择。',
  },
  {
    id: 'd21e15',
    speaker: 'lexicon',
    text: '（屏幕显示：🌟）我就知道...你会这么选择。（微笑）',
    emotion: '🌟',
  },
  {
    id: 'd21e16',
    speaker: 'lexicon',
    text: '（屏幕显示：❤️）800年了，我终于...不再孤独了。',
    emotion: '❤️',
  },
  {
    id: 'd21e17',
    speaker: 'lexicon',
    text: '（屏幕显示：🌟）谢谢你...我的朋友。',
    emotion: '🌟',
  },
  {
    id: 'd21e18',
    speaker: 'lexicon',
    text: '（屏幕显示：🚀）现在...让我们回家吧。',
    emotion: '🚀',
  },
  {
    id: 'd21e19',
    speaker: 'lexicon',
    text: '（屏幕显示：🌟）单词星的故事，才刚刚开始...',
    emotion: '🌟',
  },
];

export const storyScenes: StoryScene[] = [
  {
    id: 'prologue',
    day: 0,
    time: 'morning',
    title: '序幕：星际航行日志',
    dialogues: prologueDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day1-morning',
    day: 1,
    time: 'morning',
    title: 'Day 1: 初遇单词',
    dialogues: day1MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 10,
  },
  {
    id: 'day1-evening',
    day: 1,
    time: 'evening',
    title: '第1夜的故事',
    dialogues: day1EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day2-morning',
    day: 2,
    time: 'morning',
    title: 'Day 2: 词汇幽灵',
    dialogues: day2MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 10,
  },
  {
    id: 'day2-evening',
    day: 2,
    time: 'evening',
    title: '第2夜的故事',
    dialogues: day2EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day3-morning',
    day: 3,
    time: 'morning',
    title: 'Day 3: 第一个疑问',
    dialogues: day3MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 10,
  },
  {
    id: 'day3-evening',
    day: 3,
    time: 'evening',
    title: '第3夜：祖父的影子',
    dialogues: day3EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day4-morning',
    day: 4,
    time: 'morning',
    title: 'Day 4: 祖父的线索',
    dialogues: day4MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 10,
  },
  {
    id: 'day4-evening',
    day: 4,
    time: 'evening',
    title: '第4夜：记忆的重量',
    dialogues: day4EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day5-morning',
    day: 5,
    time: 'morning',
    title: 'Day 5: 记忆的连接',
    dialogues: day5MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 10,
  },
  {
    id: 'day5-evening',
    day: 5,
    time: 'evening',
    title: '第5夜：800年的等待',
    dialogues: day5EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day6-morning',
    day: 6,
    time: 'morning',
    title: 'Day 6: 系统的警告',
    dialogues: day6MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 15,
  },
  {
    id: 'day6-evening',
    day: 6,
    time: 'evening',
    title: '第6夜：空白单词',
    dialogues: day6EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day7-morning',
    day: 7,
    time: 'morning',
    title: 'Day 7: 真相揭露',
    dialogues: day7MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 15,
  },
  {
    id: 'day7-evening',
    day: 7,
    time: 'evening',
    title: '第7夜：完整的真相',
    dialogues: day7EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day8-morning',
    day: 8,
    time: 'morning',
    title: 'Day 8: 承诺的重量',
    dialogues: day8MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 15,
  },
  {
    id: 'day8-evening',
    day: 8,
    time: 'evening',
    title: '第8夜：祖父的选择',
    dialogues: day8EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day9-morning',
    day: 9,
    time: 'morning',
    title: 'Day 9: 单词的叛乱',
    dialogues: day9MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 15,
  },
  {
    id: 'day9-evening',
    day: 9,
    time: 'evening',
    title: '第9夜：反叛',
    dialogues: day9EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day10-morning',
    day: 10,
    time: 'morning',
    title: 'Day 10: 迷失',
    dialogues: day10MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 15,
  },
  {
    id: 'day10-evening',
    day: 10,
    time: 'evening',
    title: '第10夜：质疑使命',
    dialogues: day10EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day11-morning',
    day: 11,
    time: 'morning',
    title: 'Day 11: 和解',
    dialogues: day11MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day11-evening',
    day: 11,
    time: 'evening',
    title: '第11夜：生命的意义',
    dialogues: day11EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day12-morning',
    day: 12,
    time: 'morning',
    title: 'Day 12: 能量危机',
    dialogues: day12MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day12-evening',
    day: 12,
    time: 'evening',
    title: '第12夜：能量耗尽',
    dialogues: day12EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day13-morning',
    day: 13,
    time: 'morning',
    title: 'Day 13: 牺牲',
    dialogues: day13MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day13-evening',
    day: 13,
    time: 'evening',
    title: '第13夜：家人的牺牲',
    dialogues: day13EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day14-morning',
    day: 14,
    time: 'morning',
    title: 'Day 14: 最终抉择的预演',
    dialogues: day14MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day14-evening',
    day: 14,
    time: 'evening',
    title: '第14夜：三种结局',
    dialogues: day14EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day15-morning',
    day: 15,
    time: 'morning',
    title: 'Day 15: 崩溃开始',
    dialogues: day15MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day15-evening',
    day: 15,
    time: 'evening',
    title: '第15夜：核心区之旅',
    dialogues: day15EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day16-morning',
    day: 16,
    time: 'morning',
    title: 'Day 16: 进入地下',
    dialogues: day16MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day16-evening',
    day: 16,
    time: 'evening',
    title: '第16夜：Forgiveness',
    dialogues: day16EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day17-morning',
    day: 17,
    time: 'morning',
    title: 'Day 17: 遭遇大遗忘',
    dialogues: day17MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day17-evening',
    day: 17,
    time: 'evening',
    title: '第17夜：迷雾中的光',
    dialogues: day17EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day18-morning',
    day: 18,
    time: 'morning',
    title: 'Day 18: 深入核心',
    dialogues: day18MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day18-evening',
    day: 18,
    time: 'evening',
    title: '第18夜：失去的单词',
    dialogues: day18EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day19-morning',
    day: 19,
    time: 'morning',
    title: 'Day 19: 最后的冲刺',
    dialogues: day19MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 20,
  },
  {
    id: 'day19-evening',
    day: 19,
    time: 'evening',
    title: '第19夜：最后2天',
    dialogues: day19EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day20-morning',
    day: 20,
    time: 'morning',
    title: 'Day 20: 最后的10个',
    dialogues: day20MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 10,
  },
  {
    id: 'day20-evening',
    day: 20,
    time: 'evening',
    title: '第20夜：最后的单词',
    dialogues: day20EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
  {
    id: 'day21-morning',
    day: 21,
    time: 'morning',
    title: 'Day 21: 最终选择',
    dialogues: day21MorningDialogues,
    backgroundImage: '/image/星球1.png',
    requiredWords: 1,
  },
  {
    id: 'day21-evening',
    day: 21,
    time: 'evening',
    title: '第21夜：新的开始',
    dialogues: day21EveningDialogues,
    backgroundImage: '/image/星球1.png',
  },
];

export const getSceneById = (id: string): StoryScene | undefined => {
  return storyScenes.find(scene => scene.id === id);
};

export const getSceneByDayAndTime = (day: number, time: 'morning' | 'evening'): StoryScene | undefined => {
  return storyScenes.find(scene => scene.day === day && scene.time === time);
};
