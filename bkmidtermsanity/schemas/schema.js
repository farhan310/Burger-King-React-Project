// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {      
    title: 'Overall Site Settings',
    name: 'siteSettings',
    type: 'document',
    fields: [
      {
      title: 'Logo',
      name: 'logo',
      type: 'image',
      },
      {
        title: 'Bag Icon',
        name: 'bagIcon',
        type: 'image',
        },
        {
        title: 'Menu Hero Text',
        name: 'menuHeroText',
        type: 'string',
        },
      ]
    },
    {
      title: 'Category',
    name: 'category',
    type: 'document',
    fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          title: 'Primary Image',
          name: 'primaryImage',
          type: 'image',
        },
        {
          title: 'Carousel Image',
          name: 'carouselImage',
          type: 'image',
        },
      ],
    },
  ]),
});
