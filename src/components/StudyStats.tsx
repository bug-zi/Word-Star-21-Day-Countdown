"use client"

import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { useGameStore } from '@/stores/gameStore'

interface ForgettingCurveData {
  time: string
  retention: number
}

interface StudyProgressData {
  day: number
  words: number
  target: number
}

interface LearningTrendData {
  day: number
  newWords: number
  reviewedWords: number
}

export const StudyStats = () => {
  const { currentDay, daysProgress } = useGameStore()

  // 计算艾宾浩斯遗忘曲线数据
  const forgettingCurveData = useMemo<ForgettingCurveData[]>(() => {
    // 艾宾浩斯遗忘曲线公式: R(t) = e^(-t/S)
    // 其中 S 是记忆强度，这里设为 1.2
    const S = 1.2
    const data: ForgettingCurveData[] = []
    
    // 生成 7 天的数据点
    for (let i = 0; i <= 7; i++) {
      const retention = Math.exp(-i / S) * 100
      data.push({
        time: i === 0 ? '当天' : `${i}天`,
        retention: parseFloat(retention.toFixed(2))
      })
    }
    
    return data
  }, [])

  // 计算学习进度数据
  const studyProgressData = useMemo<StudyProgressData[]>(() => {
    const data: StudyProgressData[] = []
    
    // 为前 currentDay 天生成数据
    for (let day = 1; day <= currentDay; day++) {
      const dayProgress = daysProgress.find(dp => dp.day === day)
      data.push({
        day,
        words: dayProgress?.wordsLearned || 0,
        target: 10 // 每天目标 10 个单词
      })
    }
    
    return data
  }, [currentDay, daysProgress])

  // 计算学习趋势数据
  const learningTrendData = useMemo<LearningTrendData[]>(() => {
    const data: LearningTrendData[] = []
    
    // 为前 currentDay 天生成数据
    for (let day = 1; day <= currentDay; day++) {
      const dayProgress = daysProgress.find(dp => dp.day === day)
      
      // 计算当天学习的新单词数
      const newWords = dayProgress?.wordsLearned || 0
      
      // 计算当天复习的单词数（简化计算，实际应根据复习记录）
      const reviewedWords = Math.floor(newWords * 0.5) // 假设每天复习一半的单词
      
      data.push({
        day,
        newWords,
        reviewedWords
      })
    }
    
    return data
  }, [currentDay, daysProgress])

  // 计算总体学习统计
  const totalWordsLearned = useMemo(() => {
    return daysProgress.reduce((total, day) => total + (day.wordsLearned || 0), 0)
  }, [daysProgress])

  const averageWordsPerDay = useMemo(() => {
    if (currentDay === 0) return 0
    return parseFloat((totalWordsLearned / currentDay).toFixed(1))
  }, [currentDay, totalWordsLearned])

  const completedDays = useMemo(() => {
    return daysProgress.filter(day => day.isCompleted).length
  }, [daysProgress])

  return (
    <div className="space-y-8">
      {/* 学习统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h3 className="text-gray-400 text-sm mb-1">总学习单词</h3>
          <p className="text-2xl font-bold text-white">{totalWordsLearned}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h3 className="text-gray-400 text-sm mb-1">日均学习</h3>
          <p className="text-2xl font-bold text-white">{averageWordsPerDay}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h3 className="text-gray-400 text-sm mb-1">完成天数</h3>
          <p className="text-2xl font-bold text-white">{completedDays}/{currentDay}</p>
        </div>
      </div>

      {/* 学习进度图表 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">学习进度</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studyProgressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" label={{ value: '天数', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.7)' }} />
            <YAxis stroke="rgba(255,255,255,0.7)" domain={[0, 12]} label={{ value: '单词数', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.7)' }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(139, 92, 246, 0.5)', borderRadius: '8px' }}
              labelStyle={{ color: 'white', fontWeight: 'bold' }}
              formatter={(value, name) => [`${value}个`, name]}
              labelFormatter={(label) => `第${label}天`}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="words" name="已学单词" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" name="目标单词" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 学习趋势图表 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">学习趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={learningTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" label={{ value: '天数', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.7)' }} />
            <YAxis stroke="rgba(255,255,255,0.7)" label={{ value: '单词数', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.7)' }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(139, 92, 246, 0.5)', borderRadius: '8px' }}
              labelStyle={{ color: 'white', fontWeight: 'bold' }}
              formatter={(value, name) => [`${value}个`, name]}
              labelFormatter={(label) => `第${label}天`}
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="newWords" name="新学单词" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="reviewedWords" name="复习单词" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 艾宾浩斯遗忘曲线 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">艾宾浩斯遗忘曲线</h3>
        <p className="text-gray-400 text-sm mb-4">
          艾宾浩斯遗忘曲线展示了人类记忆的自然遗忘过程。根据曲线，我们建议在以下时间点进行复习：
          1天、2天、4天、7天，以巩固记忆效果。
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forgettingCurveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" label={{ value: '时间', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.7)' }} />
            <YAxis stroke="rgba(255,255,255,0.7)" domain={[0, 100]} label={{ value: '记忆保留率 (%)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.7)' }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(139, 92, 246, 0.5)', borderRadius: '8px' }}
              labelStyle={{ color: 'white', fontWeight: 'bold' }}
              formatter={(value) => [`${value}%`, '记忆保留率']}
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="retention" name="记忆保留率" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
