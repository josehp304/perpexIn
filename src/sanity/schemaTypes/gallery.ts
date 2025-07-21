export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      initialValue: 'Main Gallery',
      readOnly: true,
    },
    {
      name: 'folders',
      title: 'Image Folders',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Folder',
          fields: [
            {
              name: 'folderName',
              title: 'Folder Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                },
                {
                  type: 'url',
                  title: 'Image URL',
                },
              ],
              validation: (Rule: any) => Rule.min(1).error('At least one image required'),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(4).max(4).error('Exactly 4 folders required'),
    },
  ],
}; 