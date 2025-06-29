import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: 'Docusaurus Template',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://host.docker.internal',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docusaurus-template/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ray5273', // Usually your GitHub org/user name.
  projectName: 'docusaurus-Template', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'], // 'ko'
  },
  presets: [
    [
      'classic',
      {
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
        docs: {
          lastVersion: 'current',
          sidebarPath: './sidebars.ts',
          docItemComponent: "@theme/ApiItem",
          routeBasePath: '/', // Serve the docs at the site's root
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          petstore: {
            specPath: "resources/swagger_example.yaml", // path to your spec file
            outputDir: "docs/api", // path to generated docs
            sidebarOptions: {
              groupPathsBy: "tag"
            },
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
    [
      'docusaurus-plugin-ackee-v3',
      {
        // Ackee domain ID
        domainId: 'd9aac0fc-0afa-4dcf-9667-e798568642f8',

        // URL to your Ackee server
        // MUST NOT END WITH SLASH ('/')
        server: 'http://localhost:8084',

        // Enable or disable tracking of personal data (OS, device, browser, screen size, user language)
        detailed: true,

        // Enable or disable tracking when on localhost
        ignoreLocalhost: false,

        // Enable or disable the tracking of your own visits
        // Enabled by default, should be turned off when using a wildcard Access-Control-Allow-Origin header
        // Some browsers may strictly block third-party cookies and this option will have no impact in this situation
        ignoreOwnVisits: false,
      },
    ],
    [
      'docusaurus-plugin-comentario-v3',
      {
        server: 'https://ray5273.duckdns.org:8443',
      },
    ],
  ],
  themes: [
    // ... Your other themes.
    "docusaurus-theme-openapi-docs",
    '@docusaurus/theme-mermaid',
    'docusaurus-theme-search-typesense',
    'docusaurus-plugin-matomo',
  ],
  markdown: {
    mermaid: true,
  },
  themeConfig: {
    matomo: {
      matomoUrl: 'http://localhost:8085/',
      siteId: '1',
      phpLoader: 'matomo.php',
      jsLoader: 'matomo.js',
    },
    typesense: {
      // Replace this with the name of your index/collection.
      // It should match the "index_name" entry in the scraper's "config.json" file.
      typesenseCollectionName: 'mycollection',

      typesenseServerConfig: {
        nodes: [
          {
            host: 'ray5273.duckdns.org',
            port: 443,
            protocol: 'https',
          },
        ],
        apiKey: 'xyz',
      },

      // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
      typesenseSearchParameters: {
          query_by: 'hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,embedding',
          vector_query: 'embedding:([], k: 5, distance_threshold: 1.0, alpha: 0.2)' // Optional vector search fine-tuning
      },

      // Optional
      contextualSearch: true,
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Docusaurus Template',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'ADR & Architecture Design',
        },
        {
          type: 'docSidebar',
          label: 'User Guide',
          sidebarId: 'sidebarUserguide',
          position: 'left'
        },
        {
          type: 'docSidebar',
          label: 'SRS',
          sidebarId: 'sidebarSRS',
          position: 'left'
        },
        {
          type: 'docSidebar',
          label: 'API Documentation',
          sidebarId: 'sidebarApi',
          position: 'left'
        },
        {
          href: 'https://github.com/ray5273/docusaurus-template',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          dropdownActiveClassDisabled: true,
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['cpp', 'go']
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
