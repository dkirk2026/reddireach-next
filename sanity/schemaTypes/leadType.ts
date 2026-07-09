import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const leadType = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'score',
      title: 'AI Visibility Score',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: 'breakdown',
      title: 'Score Breakdown',
      type: 'object',
      fields: [
        defineField({
          name: 'domainQuality',
          title: 'Domain Quality',
          type: 'number',
        }),
        defineField({
          name: 'industryOpportunity',
          title: 'Industry Opportunity',
          type: 'number',
        }),
        defineField({
          name: 'aiDiscoverability',
          title: 'AI Discoverability',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'convertedToCall',
      title: 'Converted to Call',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      website: 'website',
      email: 'email',
      score: 'score',
      submittedAt: 'submittedAt',
    },
    prepare({website, email, score, submittedAt}) {
      let domain = website
      try {
        domain = new URL(website).hostname
      } catch {
        // use raw value
      }
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString()
        : 'No date'
      const subtitle = email ? `${email} · ${date}` : date
      return {
        title: `${domain} — Score: ${score}/10`,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
})
