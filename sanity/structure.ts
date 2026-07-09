import type {StructureResolver} from 'sanity/structure'
import {ContentScorePreview} from './components/ContentScorePreview'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      // Custom post list with content score preview
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Posts')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('post')
                .views([
                  S.view.form(),
                  S.view.component(ContentScorePreview).title('Content Score'),
                ])
            )
        ),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      S.listItem()
        .title('Leads')
        .schemaType('lead')
        .child(
          S.documentTypeList('lead')
            .title('Leads')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'lead'].includes(item.getId()!),
      ),
    ])
