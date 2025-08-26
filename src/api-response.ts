const VIEW = 'VIEW';
const EXECUTE = 'EXECUTE';

type PermissionType = 'VIEW' | 'EXECUTE';

export type Permission = {
  label: string;
  name: string;
  type: PermissionType;
  isChecked: boolean;
  children: Permission[];
  idx?: number;
}

export type Entity = {
  label: string;
  name: string;
  permissions: Permission[];
}

const activePortfoliosEntity: Entity = {
  label: "Active Portfolios",
  name: 'active_portfolios',
  permissions: [
    {
      label: 'Under Review List',
      name: 'r_under_review_listActive',
      type: VIEW,
      isChecked: false,
      children: [
        {
          label: 'Move To Review',
          name: 'u_toReviewActive',
          type: EXECUTE,
          isChecked: false,
          children: []
        },
        {
          label: 'Edit',
          name: 'u_generalActive',
          type: EXECUTE,
          isChecked: false,
          children: []
        },
        {
          label: 'Details Page',
          name: 'r_detailsActive',
          type: VIEW,
          isChecked: false,
          children: [
            {
              label: 'Included Claims List',
              name: 'r_includedClaimsActive',
              type: VIEW,
              isChecked: false,
              children: [
                {
                  label: 'Something ',
                  name: 'u_someBullshit',
                  type: EXECUTE,
                  isChecked: false,
                  children: []
                },
              ]
            },
          ]
        },
      ]
    },
    {
      label: 'Archive List',
      name: 'r_archiveList_active',
      type: VIEW,
      isChecked: false,
      children: [
        {
          label: 'Details Page',
          name: 'r_detailsActiveArch',
          type: VIEW,
          isChecked: false,
          children: [
            {
              label: 'Included Claims',
              name: 'r_includedClaimsActiveArch',
              type: VIEW,
              isChecked: false,
              children: []
            },
          ]
        },
      ]
    },
  ]
}

type ApiData = {
  managementLabel: string,
  entities: Entity[]
}
export const data: ApiData = {
  managementLabel: "Portfolio Management",
  entities: [
    activePortfoliosEntity
  ]
}