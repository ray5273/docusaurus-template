import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "swagger/sample-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "swagger/list-pets",
          label: "List all pets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "swagger/create-pet",
          label: "Create a pet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "swagger/get-pet-by-id",
          label: "Info for a specific pet",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "swagger/delete-pet",
          label: "Delete a pet",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
