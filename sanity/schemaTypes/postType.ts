import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {DateTimeWithTimezone} from '../components/DateTimeWithTimezone'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    // Basic Post Information
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'The main title of the blog post (displayed on site)',
      validation: (rule) => rule.required().min(10).max(100),
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title (For Google Search Results)',
      type: 'string',
      description: 'Power-word optimized title for search results (50-60 chars). Use numbers, brackets [2025], power words like "Proven", "Ultimate", "Complete". Leave empty to use Post Title.',
      validation: (rule) => rule.max(60).warning('Keep under 60 characters for Google display'),
    }),

    // URL/Slug Configuration
    defineField({
      name: 'slug',
      title: 'Slug / URL Path',
      type: 'slug',
      description: 'The URL path for this blog post (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // SEO & Metadata
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO meta description (under 150 characters). This appears in Google search results below the title.',
      rows: 3,
      validation: (rule) => rule.required().max(150).min(50),
    }),

    // Content Hook Fields (for better first impressions)
    defineField({
      name: 'hookStatement',
      title: 'Opening Hook (First Sentence)',
      type: 'text',
      description: 'A compelling statistic, surprising insight, or pain point. This appears in Google snippet previews and should grab attention immediately.',
      rows: 2,
      validation: (rule) => rule.max(200),
    }),

    defineField({
      name: 'promiseStatement',
      title: 'Promise Statement',
      type: 'text',
      description: 'What will the reader learn/gain? Be specific. Example: "You\'ll discover 5 proven tactics to find high-intent subreddits in under 15 minutes."',
      rows: 2,
      validation: (rule) => rule.max(250),
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Canonical URL for SEO (leave empty to use default)',
    }),

    defineField({
      name: 'structuredData',
      title: 'Schema Markup (JSON-LD)',
      type: 'text',
      description: 'Custom structured data for SEO. Must be valid JSON-LD. Leave empty to auto-generate Article schema.',
      rows: 8,
      validation: (rule) => rule.custom((value) => {
        if (!value) return true; // Optional field

        try {
          const parsed = JSON.parse(value);

          // Validate it's an object with @context and @type
          if (typeof parsed !== 'object' || !parsed['@context'] || !parsed['@type']) {
            return 'Schema must be valid JSON-LD with @context and @type properties';
          }

          return true;
        } catch (error) {
          return 'Invalid JSON format. Please check your syntax.';
        }
      }),
    }),

    // Featured Image
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image displayed with the blog post',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility and SEO',
          validation: (rule) => rule.required(),
        }
      ],
    }),

    // Content with Rich Text Editor
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      description: 'The main content of the blog post',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (rule) => rule.required(),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: false,
                  }
                ]
              },
            ]
          }
        },
        // Inline Images
        {
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility and SEO',
              validation: (rule) => rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional image caption',
            }
          ]
        },
        // Tables
        {
          type: 'object',
          name: 'table',
          title: 'Table',
          fields: [
            {
              name: 'columns',
              type: 'array',
              title: 'Column Headers',
              description: 'Define the column headers for your table',
              of: [{type: 'string', title: 'Column Header'}],
              validation: (rule) => rule.min(1).max(10)
            },
            {
              name: 'rows',
              type: 'array',
              title: 'Table Rows',
              of: [
                {
                  type: 'object',
                  name: 'row',
                  title: 'Row',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      title: 'Row Cells',
                      of: [{type: 'string', title: 'Cell'}],
                      description: 'Add cells for each column in the order defined above'
                    }
                  ]
                }
              ]
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Table Caption',
              description: 'Optional table caption for accessibility'
            }
          ],
          preview: {
            select: {
              rows: 'rows',
              columns: 'columns'
            },
            prepare({rows, columns}) {
              return {
                title: `Table with ${columns?.length || 0} columns and ${rows?.length || 0} rows`,
                subtitle: columns?.length ? `Columns: ${columns.join(', ')}` : 'No columns defined'
              }
            }
          }
        },
        // YouTube Video Embed
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube Video',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              description: 'Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)',
              validation: (rule) => rule.required().uri({
                scheme: ['https'],
                allowRelative: false
              }).custom((url: string | undefined) => {
                if (!url) return true;
                const youtubeRegex = /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/;
                if (!youtubeRegex.test(url)) {
                  return 'Please enter a valid YouTube URL';
                }
                return true;
              })
            }
          ],
          preview: {
            select: {
              url: 'url'
            },
            prepare({url}) {
              const videoId = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1];
              return {
                title: 'YouTube Video',
                subtitle: videoId ? `Video ID: ${videoId}` : 'No URL provided',
              }
            }
          }
        },
        // Q&A Section
        {
          type: 'object',
          name: 'qa',
          title: 'Q&A Box',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question',
              description: 'The question text',
              validation: (rule) => rule.required().min(10).max(200)
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer',
              description: 'The answer text',
              rows: 5,
              validation: (rule) => rule.required().min(20)
            }
          ],
          preview: {
            select: {
              question: 'question',
              answer: 'answer'
            },
            prepare({question, answer}) {
              return {
                title: question || 'Q&A',
                subtitle: answer ? `${answer.substring(0, 60)}...` : 'No answer provided'
              }
            }
          }
        },
        // FAQ Section with Schema Markup
        {
          type: 'object',
          name: 'faqSection',
          title: 'FAQ Section',
          description: 'Multiple FAQs with automatic schema markup generation for SEO',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              description: 'Optional title for the FAQ section (e.g., "Frequently Asked Questions")',
              initialValue: 'Frequently Asked Questions'
            },
            {
              name: 'faqs',
              type: 'array',
              title: 'FAQs',
              description: 'Add multiple frequently asked questions and answers',
              of: [
                {
                  type: 'object',
                  name: 'faqItem',
                  title: 'FAQ Item',
                  fields: [
                    {
                      name: 'question',
                      type: 'string',
                      title: 'Question',
                      description: 'The question text',
                      validation: (rule) => rule.required().min(10).max(300)
                    },
                    {
                      name: 'answer',
                      type: 'text',
                      title: 'Answer',
                      description: 'The answer text',
                      rows: 5,
                      validation: (rule) => rule.required().min(20)
                    }
                  ],
                  preview: {
                    select: {
                      question: 'question',
                      answer: 'answer'
                    },
                    prepare({question, answer}) {
                      return {
                        title: question || 'Untitled FAQ',
                        subtitle: answer ? `${answer.substring(0, 50)}...` : 'No answer'
                      }
                    }
                  }
                }
              ],
              validation: (rule) => rule.min(1).max(20)
            }
          ],
          preview: {
            select: {
              title: 'title',
              faqs: 'faqs'
            },
            prepare({title, faqs}) {
              return {
                title: title || 'FAQ Section',
                subtitle: `${faqs?.length || 0} FAQ items`
              }
            }
          }
        },
        // Inline Call-to-Action Block
        {
          type: 'object',
          name: 'inlineCta',
          title: 'Call to Action',
          description: 'Insert a conversion-focused CTA block within your content',
          fields: [
            {
              name: 'variant',
              type: 'string',
              title: 'CTA Variant',
              description: 'Choose the type of CTA to display',
              options: {
                list: [
                  {title: 'Discovery - Finding Subreddits', value: 'discovery'},
                  {title: 'Engagement - Comment Strategies', value: 'engagement'},
                  {title: 'Conversion - ROI & Metrics', value: 'conversion'},
                  {title: 'Default - General Purpose', value: 'default'}
                ],
                layout: 'radio'
              },
              initialValue: 'default'
            },
            {
              name: 'customHeadline',
              type: 'string',
              title: 'Custom Headline (Optional)',
              description: 'Override the default headline for this CTA'
            },
            {
              name: 'customDescription',
              type: 'text',
              title: 'Custom Description (Optional)',
              description: 'Override the default description text',
              rows: 2
            }
          ],
          preview: {
            select: {
              variant: 'variant',
              headline: 'customHeadline'
            },
            prepare({variant, headline}) {
              const variantNames: Record<string, string> = {
                discovery: 'Discovery CTA',
                engagement: 'Engagement CTA',
                conversion: 'Conversion CTA',
                default: 'Default CTA'
              };
              return {
                title: headline || variantNames[variant] || 'Call to Action',
                subtitle: `Variant: ${variant || 'default'}`
              }
            }
          }
        },
        // Related Reading Block
        {
          type: 'object',
          name: 'relatedReading',
          title: 'Related Reading',
          description: 'Insert links to related blog posts for better internal linking',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              description: 'Title for the related reading section',
              initialValue: 'Related Reading'
            },
            {
              name: 'posts',
              type: 'array',
              title: 'Related Posts',
              description: 'Select 2-4 related posts to link to',
              of: [{type: 'reference', to: [{type: 'post'}]}],
              validation: (rule) => rule.min(1).max(4)
            },
            {
              name: 'showExcerpt',
              type: 'boolean',
              title: 'Show Post Excerpts',
              description: 'Display short excerpts below each post title',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'title',
              posts: 'posts'
            },
            prepare({title, posts}) {
              return {
                title: title || 'Related Reading',
                subtitle: `${posts?.length || 0} related posts`
              }
            }
          }
        }
      ],
      validation: (rule) => rule.required(),
    }),

    // Publishing Information
    defineField({
      name: 'publishedAt',
      title: `Published Date (Your Local Time: ${Intl.DateTimeFormat().resolvedOptions().timeZone})`,
      type: 'datetime',
      description: '⏰ Set the date/time when this post should go live. The time picker uses YOUR local timezone. Leave empty for drafts.',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      components: {
        input: DateTimeWithTimezone,
      },
    }),


    // Additional Fields for Blog Organization
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short excerpt displayed on blog listing pages',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
  ],

  // Preview configuration for the Studio interface
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      publishedAt: 'publishedAt',
      author: 'author.name',
    },
    prepare({title, media, publishedAt, author}) {
      return {
        title,
        subtitle: `${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}${author ? ` • by ${author}` : ''}`,
        media,
      }
    }
  }
})
