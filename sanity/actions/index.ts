import { SetPublishDateAction } from './SetPublishDate'

/**
 * Define custom document actions for Sanity Studio
 */
export function resolveDocumentActions(prev: any, context: any) {
  // For post documents, replace the default publish action with our custom one
  if (context.schemaType === 'post') {
    return prev.map((action: any) =>
      action.action === 'publish' ? SetPublishDateAction : action
    )
  }

  return prev
}
