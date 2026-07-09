import { useDocumentOperation } from 'sanity'
import type { DocumentActionComponent } from 'sanity'

/**
 * Custom publish action that automatically sets publishedAt when publishing a post
 */
export const SetPublishDateAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const { draft } = props

  return {
    label: 'Publish',
    disabled: !!publish.disabled,
    onHandle: () => {
      const now = new Date().toISOString()
      const currentPublishedAt = draft?.publishedAt as string | undefined

      // Check if publishedAt needs to be set or updated
      // - If not set: set to NOW for immediate visibility
      // - If set to future date: update to NOW (user clicked Publish, they want it live NOW!)
      // - If set to past date: keep it (already visible, don't change history)
      const needsUpdate = !currentPublishedAt || new Date(currentPublishedAt) > new Date()

      if (draft && needsUpdate) {
        // Set publishedAt to current time for immediate publishing
        patch.execute([
          { set: { publishedAt: now } }
        ])

        // Wait for patch to complete, then publish
        setTimeout(() => {
          publish.execute()
          props.onComplete()
        }, 200)
      } else {
        // Already has a past publishedAt, just publish
        publish.execute()
        props.onComplete()
      }
    },
  }
}
