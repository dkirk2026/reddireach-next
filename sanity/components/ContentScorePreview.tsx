import React, { useMemo } from 'react'
import { Stack, Text, Box, Card, Flex, Badge } from '@sanity/ui'

interface ContentScorePreviewProps {
  document: {
    displayed: {
      title?: string
      seoTitle?: string
      metaDescription?: string
      hookStatement?: string
      promiseStatement?: string
      body?: any[]
      mainImage?: any
      categories?: any[]
    }
  }
}

interface ContentMetrics {
  wordCount: number
  headingCount: number
  imageCount: number
  linkCount: number
  ctaCount: number
  hasSeoTitle: boolean
  hasHook: boolean
  hasPromise: boolean
  hasMainImage: boolean
  hasCategories: boolean
  metaDescLength: number
}

interface ScoreResult {
  score: number
  maxScore: number
  percentage: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  color: string
}

function countWordsInBody(body: any[]): number {
  if (!body) return 0
  let wordCount = 0

  const countInBlocks = (blocks: any[]) => {
    blocks.forEach((block) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child: any) => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).filter(Boolean).length
          }
        })
      }
    })
  }

  countInBlocks(body)
  return wordCount
}

function countHeadings(body: any[]): number {
  if (!body) return 0
  return body.filter(
    (block) =>
      block._type === 'block' &&
      (block.style === 'h2' || block.style === 'h3' || block.style === 'h4')
  ).length
}

function countImages(body: any[]): number {
  if (!body) return 0
  return body.filter((block) => block._type === 'image').length
}

function countLinks(body: any[]): number {
  if (!body) return 0
  let linkCount = 0

  body.forEach((block) => {
    if (block._type === 'block' && block.markDefs) {
      linkCount += block.markDefs.filter((mark: any) => mark._type === 'link').length
    }
  })

  return linkCount
}

function countCTAs(body: any[]): number {
  if (!body) return 0
  return body.filter((block) => block._type === 'inlineCta').length
}

function calculateScore(metrics: ContentMetrics): ScoreResult {
  let score = 0
  const maxScore = 100

  // Word count scoring (max 25 points)
  if (metrics.wordCount >= 2000) score += 25
  else if (metrics.wordCount >= 1500) score += 20
  else if (metrics.wordCount >= 1000) score += 15
  else if (metrics.wordCount >= 500) score += 10
  else if (metrics.wordCount >= 300) score += 5

  // Heading structure (max 15 points)
  if (metrics.headingCount >= 5) score += 15
  else if (metrics.headingCount >= 3) score += 10
  else if (metrics.headingCount >= 1) score += 5

  // Images (max 10 points)
  if (metrics.imageCount >= 3) score += 10
  else if (metrics.imageCount >= 2) score += 7
  else if (metrics.imageCount >= 1) score += 4

  // Internal links (max 10 points)
  if (metrics.linkCount >= 5) score += 10
  else if (metrics.linkCount >= 3) score += 7
  else if (metrics.linkCount >= 1) score += 4

  // CTAs (max 10 points)
  if (metrics.ctaCount >= 2) score += 10
  else if (metrics.ctaCount >= 1) score += 5

  // SEO fields (max 30 points)
  if (metrics.hasSeoTitle) score += 8
  if (metrics.hasHook) score += 7
  if (metrics.hasPromise) score += 5
  if (metrics.hasMainImage) score += 5
  if (metrics.hasCategories) score += 5

  const percentage = Math.round((score / maxScore) * 100)

  let grade: 'A' | 'B' | 'C' | 'D' | 'F'
  let color: string

  if (percentage >= 80) {
    grade = 'A'
    color = '#22c55e' // green
  } else if (percentage >= 60) {
    grade = 'B'
    color = '#84cc16' // lime
  } else if (percentage >= 40) {
    grade = 'C'
    color = '#eab308' // yellow
  } else if (percentage >= 20) {
    grade = 'D'
    color = '#f97316' // orange
  } else {
    grade = 'F'
    color = '#ef4444' // red
  }

  return { score, maxScore, percentage, grade, color }
}

export function ContentScorePreview({ document }: ContentScorePreviewProps) {
  const { displayed } = document

  const metrics = useMemo<ContentMetrics>(() => ({
    wordCount: countWordsInBody(displayed?.body || []),
    headingCount: countHeadings(displayed?.body || []),
    imageCount: countImages(displayed?.body || []),
    linkCount: countLinks(displayed?.body || []),
    ctaCount: countCTAs(displayed?.body || []),
    hasSeoTitle: Boolean(displayed?.seoTitle),
    hasHook: Boolean(displayed?.hookStatement),
    hasPromise: Boolean(displayed?.promiseStatement),
    hasMainImage: Boolean(displayed?.mainImage),
    hasCategories: Boolean(displayed?.categories?.length),
    metaDescLength: displayed?.metaDescription?.length || 0,
  }), [displayed])

  const scoreResult = useMemo(() => calculateScore(metrics), [metrics])

  const readingTime = Math.ceil(metrics.wordCount / 200)

  return (
    <Card padding={4} style={{ height: '100%' }}>
      <Stack space={4}>
        {/* Score Header */}
        <Flex align="center" justify="space-between">
          <Text size={2} weight="bold">Content Quality Score</Text>
          <Badge
            tone={scoreResult.grade === 'A' || scoreResult.grade === 'B' ? 'positive' :
                  scoreResult.grade === 'C' ? 'caution' : 'critical'}
            style={{ fontSize: '18px', padding: '8px 16px' }}
          >
            {scoreResult.grade} ({scoreResult.percentage}%)
          </Badge>
        </Flex>

        {/* Progress Bar */}
        <Box>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e5e5e5',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${scoreResult.percentage}%`,
              height: '100%',
              backgroundColor: scoreResult.color,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </Box>

        {/* Metrics Grid */}
        <Box>
          <Text size={1} weight="bold" style={{ marginBottom: '12px' }}>Content Metrics</Text>
          <Stack space={2}>
            <MetricRow
              label="Word Count"
              value={metrics.wordCount.toLocaleString()}
              target="2,000+"
              isGood={metrics.wordCount >= 2000}
              isOkay={metrics.wordCount >= 1000}
            />
            <MetricRow
              label="Reading Time"
              value={`${readingTime} min`}
              target="10+ min"
              isGood={readingTime >= 10}
              isOkay={readingTime >= 5}
            />
            <MetricRow
              label="Headings (H2/H3/H4)"
              value={metrics.headingCount.toString()}
              target="5+"
              isGood={metrics.headingCount >= 5}
              isOkay={metrics.headingCount >= 3}
            />
            <MetricRow
              label="Inline Images"
              value={metrics.imageCount.toString()}
              target="3+"
              isGood={metrics.imageCount >= 3}
              isOkay={metrics.imageCount >= 1}
            />
            <MetricRow
              label="Internal Links"
              value={metrics.linkCount.toString()}
              target="5+"
              isGood={metrics.linkCount >= 5}
              isOkay={metrics.linkCount >= 3}
            />
            <MetricRow
              label="CTAs"
              value={metrics.ctaCount.toString()}
              target="2+"
              isGood={metrics.ctaCount >= 2}
              isOkay={metrics.ctaCount >= 1}
            />
          </Stack>
        </Box>

        {/* SEO Checklist */}
        <Box>
          <Text size={1} weight="bold" style={{ marginBottom: '12px' }}>SEO Checklist</Text>
          <Stack space={2}>
            <ChecklistItem label="SEO Title" isComplete={metrics.hasSeoTitle} />
            <ChecklistItem label="Opening Hook" isComplete={metrics.hasHook} />
            <ChecklistItem label="Promise Statement" isComplete={metrics.hasPromise} />
            <ChecklistItem label="Featured Image" isComplete={metrics.hasMainImage} />
            <ChecklistItem label="Categories" isComplete={metrics.hasCategories} />
            <ChecklistItem
              label={`Meta Description (${metrics.metaDescLength}/150)`}
              isComplete={metrics.metaDescLength >= 50 && metrics.metaDescLength <= 150}
            />
          </Stack>
        </Box>

        {/* Recommendations */}
        {scoreResult.percentage < 80 && (
          <Box>
            <Text size={1} weight="bold" style={{ marginBottom: '8px' }}>Quick Wins</Text>
            <Text size={1} muted>
              {!metrics.hasSeoTitle && '• Add an SEO title with power words\n'}
              {!metrics.hasHook && '• Write a compelling opening hook\n'}
              {metrics.wordCount < 1500 && '• Expand content to 1,500+ words\n'}
              {metrics.headingCount < 3 && '• Add more H2/H3 subheadings\n'}
              {metrics.ctaCount < 1 && '• Insert at least one CTA block\n'}
              {metrics.imageCount < 2 && '• Add more inline images\n'}
            </Text>
          </Box>
        )}
      </Stack>
    </Card>
  )
}

function MetricRow({
  label,
  value,
  target,
  isGood,
  isOkay
}: {
  label: string
  value: string
  target: string
  isGood: boolean
  isOkay: boolean
}) {
  const color = isGood ? '#22c55e' : isOkay ? '#eab308' : '#ef4444'
  const icon = isGood ? '✓' : isOkay ? '○' : '✗'

  return (
    <Flex align="center" justify="space-between" style={{ fontSize: '13px' }}>
      <Text size={1}>{label}</Text>
      <Flex align="center" gap={2}>
        <Text size={1} muted>Target: {target}</Text>
        <span style={{ color, fontWeight: 'bold' }}>{icon} {value}</span>
      </Flex>
    </Flex>
  )
}

function ChecklistItem({ label, isComplete }: { label: string; isComplete: boolean }) {
  return (
    <Flex align="center" gap={2} style={{ fontSize: '13px' }}>
      <span style={{
        color: isComplete ? '#22c55e' : '#ef4444',
        fontWeight: 'bold'
      }}>
        {isComplete ? '✓' : '✗'}
      </span>
      <Text size={1} style={{ color: isComplete ? 'inherit' : '#888' }}>
        {label}
      </Text>
    </Flex>
  )
}
