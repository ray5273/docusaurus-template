# Docusaurus Template

This is a template for a Docusaurus site. It is a simple site with a few pages and a blog.

including following features:

1. Create a sidebar with a list of pages based on the files in the `docs` directory.
2. Added versioned docs example with 1.0.0 version.
3. Added code highlighting (syntax highlighting) to the code blocks in the markdown files (cpp, golang)
4. Search functionality (only works in production build and english language)


## How to use this template

1. Generate sidebar based on the files in the `docs` directory.
```
npm run generateSidebar
```
- This will generate a sidebar based on the files in the `docs` directory and save it to the `sidebars.json` file in  root directory.

2. Start the development server.
```
npm run start
```

3. Build the site.
```
npm run build
```

4. Serve the site.
```
npm run serve
```

## How to add a new version

```bash
npm run docusaurus docs:version {version}
```

- This will create a new version of the docs with the specified version number.
- The new version will be created in the `versioned_docs` directory.
- The new version will be added to the `versions.json` file in the root directory.
- The new version will be added to the `versioned_sidebars` file in the root directory.

## How to generate api docs

```bash
npm run docusaurus gen-api-docs all
```

## Typesense DocSearch with Embeddings

DocSearch can generate vector embeddings for your documents and store them in
Typesense. To enable this, update `docsearch.config.json` with a custom
`field_definitions` section and add an `embedding` field. You also need to pass a
`query_by` list including the `embedding` field through
`typesenseSearchParameters` in `docusaurus.config.ts`.

Example:

```json
"custom_settings": {
  "field_definitions": [
    {
      "name": "embedding",
      "type": "float[]",
      "embed": {
        "from": ["content"],
        "model_config": {"model_name": "ts/gte-small"}
      }
    }
  ]
}

Using a built-in model such as `typesense/gte-small` does not require an API key.

// docusaurus.config.ts
typesenseSearchParameters: {
  query_by: "hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,embedding",
  prefix: true,
  sort_by: "_text_match:desc,_vector_distance:asc",
}
```
