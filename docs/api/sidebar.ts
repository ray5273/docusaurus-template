import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/sample-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "api/list-pets",
          label: "List all pets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-pet",
          label: "Create a pet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-pet-by-id",
          label: "Info for a specific pet",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-pet",
          label: "Delete a pet",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
